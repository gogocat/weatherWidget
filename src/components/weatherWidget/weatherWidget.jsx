import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getWeatherData, setDisplayWindInfo, setTemperatureType, changeWidgetTitle } from '../../actions/index';
import { convertKelvinToCelsius, convertKelvinToFahrenheit } from '../../util/index';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import WeatherWidgetForm from './weatherWidgetForm/weatherWidgetForm';
import WeatherWidgetDisplay from './weatherWidgetDisplay/weatherWidgetDisplay';
import { TEMPERATURE_TYPES } from '../../constants';
import './weatherWidget.css';

const mapStateToProps = state => {
    return { ...state };
};

const mapDispatchToPros = dispatch => {
    return bindActionCreators({
        getWeatherData,
        setDisplayWindInfo,
        setTemperatureType,
        changeWidgetTitle
    }, dispatch);
};

class WeatherWidget extends Component {
    componentDidMount() {
        console.log('this.props: ', this.props);
        // get user geolocation and weather data
        this.props.getWeatherData(this.props.temperatureType);
    }

    onWidgetTitleChange(e) {
        this.props.changeWidgetTitle({
            widgetTitle: e.target.value
        });
    }

    onTemperatureTypeChange(e) {
        const temperatureType = e.target.value;
        let temperature = 0;

        if (temperatureType === TEMPERATURE_TYPES.CELSIUS) {
            temperature = convertKelvinToCelsius(this.props.tempKelvin);
        } else if (temperatureType === TEMPERATURE_TYPES.FAHRENHEIT) {
            temperature = convertKelvinToFahrenheit(this.props.tempKelvin);
        }

        this.props.setTemperatureType({
            temperatureType: temperatureType,
            temperature: temperature
        });
    }

    onDisplayWindInfoChange(e) {
        this.props.setDisplayWindInfo({
            displayWindInfo: e.target.value === 'on'
        });
    }

    render() {
        const spinner = <LoadingSpinner />;
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
                <div className="weather-widget__container">{!this.props.isLoaded ? spinner : widget}</div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToPros
)(WeatherWidget);
