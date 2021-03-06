import React from 'react';
import PropTypes from 'prop-types';
import './weatherWidgetDisplay.css';
import { temperatureTypeMap, weatherIconUrl } from '../../../constants';

const WeatherWidgetDisplay = props => {
    const renderWindInfo = () => {
        return props.displayWindInfo ? (
            <small>
                <strong>Wind</strong> {props.wind}km/h
            </small>
        ) : null;
    };

    return (
        <div className="weather-widget-display">
            <div className="weather-widget-display__card">
                <h3 className="weather-widget-display__title">{props.widgetTitle}</h3>
                <div className="weather-widget-display__info-container">
                    <img src={`${weatherIconUrl}${props.weatherIcon}.png`} alt={props.weatherMain} />
                    <div className="weather-widget-display__info">
                        <span>{props.city}</span>
                        <h1 className="weather-widget-display__temperature">
                            {props.temperature}
                            <sup dangerouslySetInnerHTML={{ __html: temperatureTypeMap[props.temperatureType] }} />
                        </h1>
                        {renderWindInfo()}
                    </div>
                </div>
            </div>
        </div>
    );
};

WeatherWidgetDisplay.propTypes = {
    displayWindInfo: PropTypes.bool,
    wind: PropTypes.string,
    widgetTitle: PropTypes.string,
    city: PropTypes.string,
    temperature: PropTypes.number,
    temperatureType: PropTypes.string,
    weatherIcon: PropTypes.string,
    weatherMain: PropTypes.string
};

export default WeatherWidgetDisplay;
