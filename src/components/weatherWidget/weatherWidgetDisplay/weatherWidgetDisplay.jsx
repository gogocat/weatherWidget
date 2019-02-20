import React, { Component } from 'react';
import './weatherWidgetDisplay.css';

class WeatherWidgetDisplay extends Component {
    render() {
        return (
            <div className="weather-widget-display">
                <div className="weather-widget-display__card">
                    <h3 className="weather-widget-display__title">widgetTitle</h3>
                    <div className="weather-widget-display__info-container">
                        <img src="images/icon-cloudy.png" alt="cloudy"/>
                        <div className="weather-widget-display__info">
                            <span>Sydney</span>
                            <h1 className="weather-widget-display__temperature">26<sup>&#176;</sup></h1>
                            <small><strong>Wind</strong>NE24km/h</small>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WeatherWidgetDisplay;