import { TEMPERATURE_TYPES, ACTION_TYPES } from '../constants';

const initialState = {
    isLoaded: false,
    widgetTitle: 'Weather widget',
    temperatureType: TEMPERATURE_TYPES.CELSIUS,
    displayWindInfo: true,
    tempKelvin: 0,
    city: '',
    wind: '',
    weatherIcon: '',
    weatherMain: '',
};

function rootReducer(state = initialState, action) {
    if (action.type === ACTION_TYPES.GET_USER_LOCAL_WEATHER_DATA) {
        state = {...state, action.payload}
    }
    return state;
}

export default rootReducer;