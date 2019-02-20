import React from 'react';
import './weatherWidgetDisplay.css';

const WeatherWidgetDisplay = (props)=> {
    const renderWindInfo = ()=> {
        return (props.displayWindInfo === 'off') ? null :
        <small><strong>Wind</strong>NE24km/h</small>
    };

    const temperatureTypeMap = {
        'C': '&#176;',
        'F': '&#8457;'
    };
    
    return (
        <div className="weather-widget-display">
            <div className="weather-widget-display__card">
                <h3 className="weather-widget-display__title">{props.widgetTitle}</h3>
                <div className="weather-widget-display__info-container">
                    <img src="images/icon-cloudy.png" alt="cloudy"/>
                    <div className="weather-widget-display__info">
                        <span>{props.city}</span>
                        <h1 className="weather-widget-display__temperature">26<sup dangerouslySetInnerHTML={{__html: temperatureTypeMap[props.temperatureType]}}></sup></h1>
                        {renderWindInfo()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherWidgetDisplay;