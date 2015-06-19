IM.Utils = {};

function isFunction(fn) {
    return typeof fn === 'function';
}

IM.Utils.ajax = function(options){
    var req = new window.XMLHttpRequest();
    req.open((options.method || 'GET').toUpperCase(), options.url, true);
    req.onreadystatechange = function (aEvt) {
        var data, contentType;
        if (req.readyState === 4) {
            if (req.status === 200) {
                //Success
                if(isFunction(options.success)) {
                    data = req.responseText;
                    contentType = req.getResponseHeader('Content-Type');
                    if(contentType && /json/i.test(contentType)) {
                        data = JSON.parse(data);
                    }
                    options.success.call(req, data);
                }
            }
            else {
                //Failure
                if(isFunction(options.error)) {
                    options.error.call(req);
                }
            }
        }
    };
    req.send(null);
};

IM.Utils.createDOM = function(string){
    var wrapper = document.createElement('div');
    wrapper.innerHTML = string;
    return wrapper.firstChild;
};

IM.Utils.log = function(){
    if(IM.debug) {
        console.log.apply(console, arguments);
    }
};