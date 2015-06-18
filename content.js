InboxSDK.load('1', IM.credentials.ibsdk).then(function(sdk){

	// the SDK has been loaded, now do something with it!
	sdk.Compose.registerComposeViewHandler(function(composeView){
		// a compose view has come into existence, do something with it!
		composeView.addButton({
			title: "Add Map",
			iconUrl:  chrome.extension.getURL('assets/inbox-button.png'),
			onClick: function(event) {
				var ctx = {},
					contentElement = document.createElement('div');

				IM.getLocation().then(function(data){
			        var img = IM.Here.getMapImage(data.latitude, data.longitude);
			        contentElement.innerHTML = '<img src="' + img + '" width="250" height="250">';
			    });

				ctx.modal = sdk.Widgets.showModalView({
					el: contentElement,
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
