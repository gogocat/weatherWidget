import React, { Component } from 'react';
import WeatherWidgetForm from './weatherWidgetForm/weatherWidgetForm';
import WeatherWidgetDisplay from './weatherWidgetDisplay/weatherWidgetDisplay';
import './weatherWidget.css';

class WeatherWidget extends Component {
    render() {
        return (
            <div className="weather-widget">
                <div className="weather-widget__container">
                    <WeatherWidgetForm/>
                    <WeatherWidgetDisplay/>
                </div>
            </div>
        );
    }
}

export default WeatherWidget;