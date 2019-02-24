export const TEMPERATURE_TYPES = {
    CELSIUS: 'C',
    FAHRENHEIT: 'F',
};

export const ACTION_TYPES = {
    GET_USER_LOCAL_WEATHER_DATA: 'GET_USER_LOCAL_WEATHER_DATA',
    SET_DISPLAY_WIND_INFO: 'SET_DISPLAY_WIND_INFO',
    SET_TEMPERATURE_TYPE: 'SET_TEMPERATURE_TYPE',
    CHANGE_WIDGET_TITLE: 'CHANGE_WIDGET_TITLE',
};

export const temperatureTypeMap = {
    C: '&#176;',
    F: '&#8457;'
};

export const weatherIconUrl = 'https://openweathermap.org/img/w/';