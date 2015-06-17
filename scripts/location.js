IM.getLocation = function(){
    var options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
    };
    var promise = new Promise(function(resolve, reject){
        navigator.geolocation.getCurrentPosition(function(pos){
            resolve(pos.coords);
        }, reject, options);
    });
    return promise;
};