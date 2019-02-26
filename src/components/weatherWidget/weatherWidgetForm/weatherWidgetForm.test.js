import React from 'react';
import { shallow } from 'enzyme';
import WeatherWidgetForm from './weatherWidgetForm';

const props = {
    widgetTitle: 'widget title',
    temperatureType: 'C',
    onWidgetTitleChange: jest.fn(e => {
        return 'Mocked onWidgetTitleChange';
    }),
    onTemperatureTypeChange: jest.fn(e => {
        return 'Mocked onTemperatureTypeChange function';
    }),
    onDisplayWindInfoChange: jest.fn(e => {
        return 'Mocked onDisplayWindInfoChange function';
    })
};

it('renders match snapshot', () => {
    const component = shallow(
        <WeatherWidgetForm
            widgetTitle={props.widgetTitle}
            temperatureType={props.temperatureType}
            handleTitleChange={props.onWidgetTitleChange.bind(this)}
            setTemperatureType={props.onTemperatureTypeChange.bind(this)}
            setDisplayWindInfo={props.onDisplayWindInfoChange.bind(this)}
        />
    );
    expect(component.getElements()).toMatchSnapshot();
});
