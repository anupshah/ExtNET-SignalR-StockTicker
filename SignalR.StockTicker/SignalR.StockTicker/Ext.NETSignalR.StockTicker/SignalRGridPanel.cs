using Ext.Net;

namespace Microsoft.AspNet.SignalR.StockTicker.Ext.NETSignalR.StockTicker
{
	public class SignalRGridPanel : GridPanel
	{
		public override string XType
		{
			get { return "signalrgridpanel"; }
		}

		public override string InstanceOf
		{
			get { return "ExtNetSignalRDemo.SignalRGridPanel"; }
		}
	}
}