IM.Actions = {};

IM.Actions.injectCurrentLocation = function(view, sdk){
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
        view.insertHTMLIntoBodyAtCursor('<a href="https://www.here.com/?x=ep&map=' + data.latitude + ',' + data.longitude + ',16"><img src="' + img + '" width="250" height="250" style="width:250px;height:250px;">');
    });
};