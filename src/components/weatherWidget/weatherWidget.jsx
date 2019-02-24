import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getUserLocalWeatherData,
    setDisplayWindInfo,
    setTemperatureType,
    changeWidgetTitle
} from '../../actions/index';
import {
    convertKelvinToCelsius,
    convertKelvinToFahrenheit,
} from './util';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import WeatherWidgetForm from './weatherWidgetForm/weatherWidgetForm';
import WeatherWidgetDisplay from './weatherWidgetDisplay/weatherWidgetDisplay';
import { TEMPERATURE_TYPES } from '../../constants';
import './weatherWidget.css';

const mapStateToProps = (state) => {
    return {...state};
};

class WeatherWidget extends Component {
    componentDidMount() {
        console.log('this.props: ', this.props);
        // get user geolocation and weather data
        /*
        getUserLocalWeatherData(_this.props.temperatureType).then((newWeatherState)=>{
            _this.setState(newWeatherState);
        });
        */
    }

    onWidgetTitleChange(e) {
        this.props.dispatch(changeWidgetTitle({
            widgetTitle: e.target.value
        }));
        /*
        this.setState({
            widgetTitle: e.target.value
        });
        */
    }

    onTemperatureTypeChange(e) {
        const temperatureType = e.target.value;
        let temperature = 0;

        if (temperatureType === TEMPERATURE_TYPES.CELSIUS) {
            temperature = convertKelvinToCelsius(this.state.tempKelvin);
        } else if (temperatureType === TEMPERATURE_TYPES.FAHRENHEIT) {
            temperature = convertKelvinToFahrenheit(this.state.tempKelvin);
        }

        this.props.dispatch(setTemperatureType({
            temperatureType: temperatureType,
            temperature: temperature
        }))
        /*
        this.setState({
            temperatureType: temperatureType,
            temperature: temperature
        });
        */
    }

    onDisplayWindInfoChange(e) {
        this.props.dispatch(setDisplayWindInfo({
            displayWindInfo: e.target.value === 'on'
        }));
        /*
        this.setState({
            displayWindInfo: e.target.value === 'on'
        });
        */
    }

    render() {
        const spinner = <LoadingSpinner/>;
        const widget = (
            <div className="weather-widget__wrap">
                <WeatherWidgetForm
                    widgetTitle={this.props.widgetTitle}
                    temperatureType={this.props.temperatureType}
                    handleTitleChange={this.onWidgetTitleChange.bind(this)}
                    setTemperatureType={this.onTemperatureTypeChange.bind(this)}
                    setDisplayWindInfo={this.onDisplayWindInfoChange.bind(this)}
                />
                <WeatherWidgetDisplay
                    widgetTitle={this.props.widgetTitle}
                    weatherIcon={this.props.weatherIcon}
                    weatherMain={this.props.weatherMain}
                    temperature={this.props.temperature}
                    temperatureType={this.props.temperatureType}
                    displayWindInfo={this.props.displayWindInfo}
                    city={this.props.city}
                    wind={this.props.wind}
                />
            </div>
        );
        
        return (
            <div className="weather-widget">
                <div className="weather-widget__container">
                    {(!this.props.isLoaded) ? spinner : widget}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(WeatherWidget);
