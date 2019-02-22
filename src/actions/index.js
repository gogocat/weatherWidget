import ACTION_TYPES from '../constants';

export function getUserLocalWeatherData(payload) {
    return {
        type: ACTION_TYPES.GET_USER_LOCAL_WEATHER_DATA,
        payload
    };
};
