/// <reference path="../scripts/jquery-1.8.3.js" />
/// <reference path="../scripts/jquery.signalR-1.0.0.js" />

/*!
	ASP.NET SignalR Stock Ticker Sample, modified to work with Ext.NET
*/

Ext.onReady(function () {
	var ticker = $.connection.stockTicker, // the generated client-side hub proxy
		up = '▲',
		down = '▼',
		extNetTicker = Ext.ns("ExtNETTicker");

	extNetTicker.open = function () {
		ticker.server.openMarket();
	};

	extNetTicker.close = function () {
		ticker.server.closeMarket();
	};

	extNetTicker.reset = function () {
		ticker.server.reset();
	};

	extNetTicker.renderDirection = function (val, cell, data) {
		var isUp = data.data.Change >= 0,
			className = isUp ? 'up' : 'down';
		
		return data.data.Change === 0 ? '' : Ext.String.format('<span class="{0}">{1}</span>', className, (isUp ? up : down));
	};

	extNetTicker.convertPercentChange = function (value) {
		return (value * 100).toFixed(2) + '%';
	};

	extNetTicker.convertPrice = function(value) {
		return value.toFixed(2);
	};

	function init() {
		return ticker.server.getAllStocks().done(function (stocks) {
			$.each(stocks, function () {
				App.GridPanel1.getStore().load(stocks);
			});
		});
	}

	// While using Ext.NET, still need dependency on jQuery as SignalR uses it
	// Client-side hub methods that the server will call
	$.extend(ticker.client, {
		updateStockPrice: function (stock) {
			var store = App.GridPanel1.getStore(),
				rowIndexOfStockItem = store.indexOfId(stock.Symbol),
				highlightRow = rowIndexOfStockItem,
				row, el;
			
			if (rowIndexOfStockItem === -1) {
				store.loadData([stock], true);
				highlightRow = store.getCount();
			} else {
				store.getAt(rowIndexOfStockItem).set(stock);
			}

			row = App.GridPanel1.getView().getNode(highlightRow);
			el = Ext.get(row);
			Ext.get(el).highlight(stock.Change >= 0 ? '#55dd55' : '#dd5555', { attr: 'backgroundColor', duration: 750 });
		},

		marketOpened: function () {
			App.GridPanel1.down("#btnOpen").setDisabled(true);
			App.GridPanel1.down("#btnClose").setDisabled(false);
			App.GridPanel1.down("#btnReset").setDisabled(true);
		},

		marketClosed: function () {
			App.GridPanel1.down("#btnOpen").setDisabled(false);
			App.GridPanel1.down("#btnClose").setDisabled(true);
			App.GridPanel1.down("#btnReset").setDisabled(false);
		},

		marketReset: function () {
			return init();
		}
	});

	// Start the connection
	$.connection.hub.start()
		.pipe(init)
		.pipe(function () {
			return ticker.server.getMarketState();
		})
		.done(function (state) {
			if (state === 'Open') {
				ticker.client.marketOpened();
			} else {
				ticker.client.marketClosed();
			}
		});
});