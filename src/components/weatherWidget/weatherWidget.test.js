import React from 'react';
import { shallow } from 'enzyme';
import WeatherWidget from './weatherWidget';

it('renders without crashing', () => {
    const component = shallow(<WeatherWidget />);
    expect(component.getElements()).toMatchSnapshot();
});
