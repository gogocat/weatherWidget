import { TEMPERATURE_TYPES, ACTION_TYPES } from '../constants';

const initialState = {
    isLoaded: true,
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
    if (ACTION_TYPES[action.type]) {
        return {...state, ...action.payload};
    }
    return state;
}

export default rootReducer;