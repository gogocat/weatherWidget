import { TEMPERATURE_TYPES } from '../../constants';

const googleapiUrl = 'https://maps.googleapis.com/maps/api';
const googleAPIKey = 'AIzaSyCCcOCD-ujy1JC5Z4FHO5OnNKKDLI7kra4';
const openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
const openWeatherAPIID = 'd0242a244347adc1fc21174db9161fe5';

const getAddressByLatLong = (latitude, longitude) => {
    return new Promise(function(resolve, reject) {
        const request = new XMLHttpRequest();
        const method = 'GET';
        const url = `${googleapiUrl}/geocode/json?key=${googleAPIKey}&latlng=${latitude},${longitude}&sensor=true`;
        const async = true;

        request.open(method, url, async);
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    const data = JSON.parse(request.responseText);
                    const address = data.results[0];
                    resolve(address);
                } else {
                    reject(request.status);
                }
            }
        };
        request.send();
    });
};

const getLocality = data => {
    const address = data.address_components;
    let ret = '';

    if (address && address.length) {
        for (let i = 0; i < address.length; i += 1) {
            const addressInfo = address[i];
            if (addressInfo.short_name && addressInfo.types[0] === 'locality') {
                ret = addressInfo.short_name;
                break;
            }
        }
    }
    return ret;
};

const getWeatherInfoByCity = (locality, country = 'au') => {
    const queryUri = `${openWeatherUrl}?q=${locality},${country}&APPID=${openWeatherAPIID}`;
    return fetch(queryUri).then(function(response) {
        return response.json();
    });
};

const convertKelvinToCelsius = kelvin => {
    return Math.round(Number(kelvin) - 273.15);
};

const convertKelvinToFahrenheit = kelvin => {
    return Math.round((kelvin - 273.15) * 1.8 + 32);
};

const convertMpsToKmh = mps => {
    // round and parse to whole number
    return parseInt(Math.round(((mps * 3600) / 1610.3) * 1000) / 1000);
};

const convertWindDegreeToTextual = degree => {
    const textualKeys = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    let direction;

    degree += 22.5;

    if (degree < 0) {
        degree = 360 - (Math.abs(degree) % 360);
    } else {
        degree = degree % 360;
    }
    direction = parseInt(degree / 45);
    return textualKeys[direction];
};

const getUserLocalWeatherData = (temperatureType)=> {
    const promiseWeatherData = new Promise((resolve, reject)=> {
        let userLocalWeatherData = {};
        /*
        // 1. get user geo location - lat, long
        // 2. pass to googlemap API to get locaity. eg Sydey
        // 3. get OpenWeather data using locaity
        */
        navigator.geolocation.getCurrentPosition((position) => {
            getAddressByLatLong(position.coords.latitude, position.coords.longitude)
                .then(data => {
                    const locality = getLocality(data);
                    if (locality) {
                        return locality;
                    }
                })
                .then(city => {
                    getWeatherInfoByCity(city).then(data => {
                        const temp = data.main.temp;
                        userLocalWeatherData = {
                            city: city,
                            tempKelvin: temp
                        };
                        console.log('weather data: ', data);
                        if (temperatureType === TEMPERATURE_TYPES.CELSIUS) {
                            userLocalWeatherData.temperature = convertKelvinToCelsius(temp);
                        } else if (temperatureType === TEMPERATURE_TYPES.FAHRENHEIT) {
                            userLocalWeatherData.temperature = convertKelvinToFahrenheit(temp);
                        }
    
                        if (data.wind) {
                            userLocalWeatherData.wind = `${convertWindDegreeToTextual(data.wind.deg)} ${convertMpsToKmh(data.wind.speed || 0)}`;
                        }
                        userLocalWeatherData.isLoaded = true;

                        resolve(userLocalWeatherData);
                    });
                })
                .catch((err)=> {
                    reject(err);
                });
        });
    });
    
    return promiseWeatherData;
};

export {
    getAddressByLatLong,
    getLocality,
    getWeatherInfoByCity,
    convertKelvinToCelsius,
    convertKelvinToFahrenheit,
    convertWindDegreeToTextual,
    convertMpsToKmh,
    getUserLocalWeatherData,
};
