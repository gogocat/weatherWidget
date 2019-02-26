import { ACTION_TYPES } from '../constants';
import { getUserLocalWeatherData } from '../util/index'

export function getWeatherData() {
    return function(dispatch, getState) {
        // console.log('getUserLocalWeatherData state: ', getState());
        const currentState = getState();
        return getUserLocalWeatherData(currentState.temperatureType).then(newWeatherState => {
            dispatch({
                type: ACTION_TYPES.GET_USER_LOCAL_WEATHER_DATA,
                payload: newWeatherState
            });
        });
    };
}

export function setDisplayWindInfo(payload) {
    return {
        type: ACTION_TYPES.SET_DISPLAY_WIND_INFO,
        payload
    };
}

export function setTemperatureType(payload) {
    return {
        type: ACTION_TYPES.SET_TEMPERATURE_TYPE,
        payload
    };
}

export function changeWidgetTitle(payload) {
    return {
        type: ACTION_TYPES.CHANGE_WIDGET_TITLE,
        payload
    };
}
