IM.Here = {};
IM.Here.getMapImage = function(lat, lon, t, z){
    const template = 'https://image.maps.api.here.com/mia/1.6/mapview?app_id={APP_ID}&app_code={APP_CODE}&c={LAT},{LON}&r=10k&t={T}&w=250&h=250&z={Z}';
    t = t || 5;
    z = z || 14;
    return url = template
        .replace('{APP_ID}', IM.credentials.here.app_id)
        .replace('{APP_CODE}', IM.credentials.here.app_code)
        .replace('{APP_ID}', IM.credentials.here.app_id)
        .replace('{LAT}', lat)
        .replace('{LON}', lon)
        .replace('{T}', t)
        .replace('{Z}', z);
}