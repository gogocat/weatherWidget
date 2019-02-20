import React, { Component } from 'react';
import { getAddressByLatLong } from './util'
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
            city: 'Sydney',
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position.coords.latitude, position.coords.longitude);
            getAddressByLatLong(position.coords.latitude, position.coords.longitude)
                .then((address)=>{
                    console.log('address:  ', address);
                })
        });
    }

    handleTitleChange(e) {
        console.log(e);
        this.setState({
            widgetTitle: e.target.value
        });
    }

    setTemperatureType(e) {
        console.log(e.target.value, this);
        this.setState({
            temperatureType: e.target.value
        });
    }

    setDisplayWindInfo(e) {
        console.log(e.target.value, this);
        this.setState({
            displayWindInfo: e.target.value
        });
    }

    render() {
        return (
            <div className="weather-widget">
                <div className="weather-widget__container">
                    <WeatherWidgetForm
                        widgetTitle={this.state.widgetTitle}
                        handleTitleChange={this.handleTitleChange.bind(this)}
                        setTemperatureType={this.setTemperatureType.bind(this)}
                        setDisplayWindInfo={this.setDisplayWindInfo.bind(this)}
                    />
                    <WeatherWidgetDisplay
                        widgetTitle={this.state.widgetTitle}
                        temperatureType={this.state.temperatureType}
                        displayWindInfo={this.state.displayWindInfo}
                        city={this.state.city}
                    />
                </div>
            </div>
        );
    }
}

export default WeatherWidget;