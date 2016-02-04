<%@ Page Language="C#" %>
<%@ Register TagPrefix="ext" Namespace="Microsoft.AspNet.SignalR.StockTicker.Ext.NETSignalR.StockTicker" Assembly="Microsoft.AspNet.SignalR.StockTicker" %>
<!DOCTYPE html>
<html>
	<head runat="server">
		<title>SignalR Stock Ticker example using Ext.NET</title>

		<link href="style.css" rel="stylesheet" />

		<ext:ResourcePlaceHolder runat="server" />

	    <script src="../bundles/jquery"></script>
		<script src="../Scripts/jquery.signalR-2.2.0.min.js"></script>
		<script src="../signalr/hubs"></script>
		<script src="SignalR.StockTicker.js"></script>
	</head>
	<body>
		<ext:ResourceManager ID="ResourceManager1" runat="server" />
		
		<ext:Window runat="server" Layout="Fit" Icon="Table" Title="SignalR Stock Ticker with Ext.NET" Closable="false" Width="550" Height="300" Border="false">
			<Items>
				<ext:SignalRGridPanel ID="GridPanel1" runat="server" />
			</Items>
		</ext:Window>
	</body>
</html>
