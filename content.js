InboxSDK.load('1', IM.credentials.ibsdk).then(function(sdk){

	// the SDK has been loaded, now do something with it!
	sdk.Compose.registerComposeViewHandler(function(composeView){
		// a compose view has come into existence, do something with it!
		composeView.addButton({
			title: "Add Map",
			iconUrl:  chrome.extension.getURL('assets/inbox-button.png'),
			onClick: function(event) {
				const utils = IM.Utils,
					  here = IM.Here;
				IM.getLocation().then(function(data){
					utils.log(data);
					var img = here.getMapImage(data.latitude, data.longitude);
					event.composeView.insertHTMLIntoBodyAtCursor('<img src="' + img + '" width="250" height="250">');

					// insertTextIntoBodyAtCursor(data.latitude.toFixed(4) + ', ' + data.longitude.toFixed(4));
				});
			}
		});

	});

});
