import React from 'react';
import { shallow } from 'enzyme';
import WeatherWidgetDisplay from './weatherWidgetDisplay';

const props = {
    widgetTitle: 'widget title',
    weatherIcon: 'someIcon',
    weatherMain: '',
    temperature: 0,
    temperatureType: 'C',
    displayWindInfo: true,
    city: 'Sydney',
    wind: 'mock wind'
};

it('renders match snapshot', () => {
    const component = shallow(<WeatherWidgetDisplay
        widgetTitle={props.widgetTitle}
        weatherIcon={props.weatherIcon}
        weatherMain={props.weatherMain}
        temperature={props.temperature}
        temperatureType={props.temperatureType}
        displayWindInfo={props.displayWindInfo}
        city={props.city}
        wind={props.wind}
    />);
    expect(component.getElements()).toMatchSnapshot();
});
