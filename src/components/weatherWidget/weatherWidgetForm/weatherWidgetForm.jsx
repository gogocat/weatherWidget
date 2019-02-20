import React, { Component } from 'react';
import './weatherWidgetForm.css';

class WeatherWidgetForm extends Component {
    constructor() {
        super();
        this.handleTitleKeyUp.bind(this);
        this.setTemperatureType.bind(this);
    }

    handleTitleKeyUp(e) {
        console.log(e);
    }

    setTemperatureType(e) {
        console.log(e.target.value);
    }


    render() {

        return (
            <div className="weather-widget-form">
                <div className="weather-widget-form__row">
                    <label className="weather-widget-form__label" htmlFor="widgetTitle">Title</label>
                    <input className="weather-widget-form__input--text" type="text" onKeyUp={this.handleTitleKeyUp} id="widgetTitle" name="widgetTitle" placeholder="Title of widget"/>
                </div>
                <div className="weather-widget-form__row" onChange={this.setTemperatureType}>
                    <label className="weather-widget-form__label">Temperature</label>
                    <label className="weather-widget-form__radio-containder">
                        <span className="weather-widget-form__radio-title">&#8451;</span>
                        <input type="radio" value="C" defaultChecked name="temperature"/>
                        <span className="weather-widget-form__radio-btn"></span>
                    </label>
                    <label className="weather-widget-form__radio-containder">
                        <span className="weather-widget-form__radio-title">&#8457;</span>
                        <input type="radio" value="F" name="temperature"/>
                        <span className="weather-widget-form__radio-btn"></span>
                    </label>
                </div>
                <div className="weather-widget-form__row">
                    <label className="weather-widget-form__label">Wind</label>
                    <label className="weather-widget-form__radio-containder">
                        <span className="weather-widget-form__radio-title">On</span>
                        <input type="radio" defaultChecked name="wind"/>
                        <span className="weather-widget-form__radio-btn"></span>
                    </label>
                    <label className="weather-widget-form__radio-containder">
                        <span className="weather-widget-form__radio-title">Off</span>
                        <input type="radio" name="wind"/>
                        <span className="weather-widget-form__radio-btn"></span>
                    </label>
                </div>
            </div>
        );
    }
}

export default WeatherWidgetForm;