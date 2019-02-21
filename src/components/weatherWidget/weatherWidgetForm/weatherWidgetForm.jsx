import React from 'react';
import PropTypes from 'prop-types';
import { TEMPERATURE_TYPES } from '../../../constants';
import './weatherWidgetForm.css';

const WeatherWidgetForm = (props) => {



    return (
        <div className="weather-widget-form">
            <div className="weather-widget-form__row">
                <label className="weather-widget-form__label" htmlFor="widgetTitle">Title</label>
                <input 
                    className="weather-widget-form__input--text" 
                    type="text" 
                    onChange={props.handleTitleChange} 
                    id="widgetTitle" 
                    name="widgetTitle" 
                    value={props.widgetTitle}
                    placeholder="Title of widget"
                />
            </div>
            <div className="weather-widget-form__row">
                <label className="weather-widget-form__label">Temperature</label>
                <label className="weather-widget-form__radio-containder">
                    <span className="weather-widget-form__radio-title">&#8451;</span>
                    <input
                        type="radio"
                        value={TEMPERATURE_TYPES.CELSIUS} 
                        checked={props.temperatureType === TEMPERATURE_TYPES.CELSIUS}
                        onChange={props.setTemperatureType}
                        name="temperature"
                    />
                    <span className="weather-widget-form__radio-btn"></span>
                </label>
                <label className="weather-widget-form__radio-containder">
                    <span className="weather-widget-form__radio-title">&#8457;</span>
                    <input
                        type="radio" 
                        value={TEMPERATURE_TYPES.FAHRENHEIT} 
                        checked={props.temperatureType === TEMPERATURE_TYPES.FAHRENHEIT}
                        onChange={props.setTemperatureType} 
                        name="temperature"
                    />
                    <span className="weather-widget-form__radio-btn"></span>
                </label>
            </div>
            <div className="weather-widget-form__row" onChange={props.setDisplayWindInfo}>
                <label className="weather-widget-form__label">Wind</label>
                <label className="weather-widget-form__radio-containder">
                    <span className="weather-widget-form__radio-title">On</span>
                    <input type="radio" value="on" defaultChecked name="wind"/>
                    <span className="weather-widget-form__radio-btn"></span>
                </label>
                <label className="weather-widget-form__radio-containder">
                    <span className="weather-widget-form__radio-title">Off</span>
                    <input type="radio" value="off" name="wind"/>
                    <span className="weather-widget-form__radio-btn"></span>
                </label>
            </div>
        </div>
    );

};

WeatherWidgetForm.propTypes = {
    temperatureType: PropTypes.string.isRequired,
    handleTitleChange: PropTypes.func.isRequired,
    setTemperatureType: PropTypes.func.isRequired,
    widgetTitle: PropTypes.string,
    setDisplayWindInfo: PropTypes.func.isRequired,
};

export default WeatherWidgetForm;