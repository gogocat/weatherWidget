import React, { Component } from 'react';
import {
    convertKelvinToCelsius,
    convertKelvinToFahrenheit,
    getUserLocalWeatherData
} from './util';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import WeatherWidgetForm from './weatherWidgetForm/weatherWidgetForm';
import WeatherWidgetDisplay from './weatherWidgetDisplay/weatherWidgetDisplay';
import { TEMPERATURE_TYPES } from '../../constants';
import './weatherWidget.css';

class WeatherWidget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            widgetTitle: 'Weather widget',
            temperatureType: TEMPERATURE_TYPES.CELSIUS,
            displayWindInfo: true,
            tempKelvin: 0,
            city: '',
            wind: ''
        };
    }

    componentDidMount() {
        const _this = this;
        // get user geolocation and weather data
        getUserLocalWeatherData(_this.state.temperatureType).then((newWeatherState)=>{
            _this.setState(newWeatherState);
        });
    }

    handleTitleChange(e) {
        this.setState({
            widgetTitle: e.target.value
        });
    }

    setTemperatureType(e) {
        const temperatureType = e.target.value;
        let temperature = 0;

        if (temperatureType === TEMPERATURE_TYPES.CELSIUS) {
            temperature = convertKelvinToCelsius(this.state.tempKelvin);
        } else if (temperatureType === TEMPERATURE_TYPES.FAHRENHEIT) {
            temperature = convertKelvinToFahrenheit(this.state.tempKelvin);
        }

        this.setState({
            temperatureType: temperatureType,
            temperature: temperature
        });
    }

    setDisplayWindInfo(e) {
        this.setState({
            displayWindInfo: e.target.value === 'on'
        });
    }

    render() {
        const spinner = <LoadingSpinner/>;
        const widget = (
            <div className="weather-widget__wrap">
                <WeatherWidgetForm
                    widgetTitle={this.state.widgetTitle}
                    temperatureType={this.state.temperatureType}
                    handleTitleChange={this.handleTitleChange.bind(this)}
                    setTemperatureType={this.setTemperatureType.bind(this)}
                    setDisplayWindInfo={this.setDisplayWindInfo.bind(this)}
                />
                <WeatherWidgetDisplay
                    widgetTitle={this.state.widgetTitle}
                    temperature={this.state.temperature}
                    temperatureType={this.state.temperatureType}
                    displayWindInfo={this.state.displayWindInfo}
                    city={this.state.city}
                    wind={this.state.wind}
                />
            </div>
        );
        
        return (
            <div className="weather-widget">
                <div className="weather-widget__container">
                    {(!this.state.isLoaded) ? spinner : widget}
                </div>
            </div>
        );
    }
}

export default WeatherWidget;
