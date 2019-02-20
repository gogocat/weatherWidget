const getAddressByLatLong = (latitude, longitude) => {
    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest();
        const method = 'GET';
        const url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
        const async = true;

        request.open(method, url, async);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    const data = JSON.parse(request.responseText);
                    const address = data.results[0];
                    resolve(address);
                }
                else {
                    reject(request.status);
                }
            }
        };
        request.send();
    });
};

export {getAddressByLatLong}