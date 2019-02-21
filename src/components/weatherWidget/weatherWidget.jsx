import React, { Component } from 'react';
import {
    getAddressByLatLong,
    getLocality,
    getWeatherInfoByCity,
    convertKelvinToCelsius,
    convertKelvinToFahrenheit,
    convertWindDegreeToTextual,
    convertMpsToKmh
} from './util';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import WeatherWidgetForm from './weatherWidgetForm/weatherWidgetForm';
import WeatherWidgetDisplay from './weatherWidgetDisplay/weatherWidgetDisplay';
import './weatherWidget.css';

class WeatherWidget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            widgetTitle: 'Weather widget',
            temperatureType: 'C',
            displayWindInfo: 'on',
            tempKelvin: 0,
            city: '',
            wind: ''
        };
    }

    componentDidMount() {
        const _this = this;
        let locality = '';

        /*
        // 1. get user geo location - lat, long
        // 2. pass to googlemap API to get locaity. eg Sydey
        // 3. get OpenWeather data using locaity
        */
        navigator.geolocation.getCurrentPosition(function(position) {
            getAddressByLatLong(position.coords.latitude, position.coords.longitude)
                .then(data => {
                    locality = getLocality(data);
                    if (locality) {
                        return locality;
                    }
                })
                .then(city => {
                    getWeatherInfoByCity(city).then(data => {
                        const temp = data.main.temp;
                        const newState = {
                            city: locality,
                            tempKelvin: temp
                        };
                        console.log(data);
                        if (_this.state.temperatureType === 'C') {
                            newState.temperature = convertKelvinToCelsius(temp);
                        } else if (_this.state.temperatureType === 'F') {
                            newState.temperature = convertKelvinToFahrenheit(temp);
                        }

                        if (data.wind) {
                            newState.wind = `${convertWindDegreeToTextual(data.wind.deg)} ${convertMpsToKmh(
                                data.wind.speed || 0
                            )}`;
                        }
                        newState.isLoaded = true;
                        _this.setState(newState);
                    });
                });
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

        if (temperatureType === 'C') {
            temperature = convertKelvinToCelsius(this.state.tempKelvin);
        } else if (temperatureType === 'F') {
            temperature = convertKelvinToFahrenheit(this.state.tempKelvin);
        }

        this.setState({
            temperatureType: temperatureType,
            temperature: temperature
        });
    }

    setDisplayWindInfo(e) {
        this.setState({
            displayWindInfo: e.target.value
        });
    }

    render() {
        const spinner = <LoadingSpinner/>;
        const widget = (
            <div className="weather-widget__wrap">
                <WeatherWidgetForm
                    widgetTitle={this.state.widgetTitle}
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
