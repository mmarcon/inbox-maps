IM.Actions = {};

IM.Actions.injectCurrentLocation = function(composeView, sdk){
    var utils = IM.Utils,
    here = IM.Here;

    var message = sdk.ButterBar.showMessage({
        text: 'Determining your current location...',
        hideOnViewChanged: true,
        persistent: true
    });

    return IM.getLocation().then(function(data){
        utils.log(data);
        message.destroy();
        var img = here.getMapImage(data.latitude, data.longitude);
        composeView.insertHTMLIntoBodyAtCursor('<img src="' + img + '" width="250" height="250">');
    });
};

IM.Actions.injectCurrentLocation.button = function(composeView, sdk, ctx) {
    return {
        text: 'Current Location',
        title: 'Share the current location',
        onClick: function(){
            IM.Actions.injectCurrentLocation(composeView, sdk);
            ctx.modal.close();
        }
    };
};