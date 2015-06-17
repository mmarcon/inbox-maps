InboxSDK.load('1', IM.credentials.ibsdk).then(function(sdk){

	// the SDK has been loaded, now do something with it!
	sdk.Compose.registerComposeViewHandler(function(composeView){
		// a compose view has come into existence, do something with it!
		composeView.addButton({
			title: "Add Map",
			iconUrl:  chrome.extension.getURL('assets/inbox-button.png'),
			onClick: function(event) {
				var ctx = {};
				ctx.modal = sdk.Widgets.showModalView({
					el: document.createElement('div'),
					chrome: true,
					title: 'Inbox Maps',
					buttons: [
						IM.Actions.injectCurrentLocation.button(event.composeView, sdk, ctx)
					]
				});
			}
		});

	});

});
