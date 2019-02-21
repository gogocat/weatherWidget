import React from 'react';
import { shallow } from 'enzyme';
import WeatherWidget from './weatherWidget';

const mockGeolocation = {
    getCurrentPosition: jest.fn()
      .mockImplementationOnce((success) => Promise.resolve(success({
        coords: {
          latitude: 51.1,
          longitude: 45.3
        }
      })))
  };

global.navigator = { geolocation: mockGeolocation };

it('renders without crashing', () => {
    
    shallow(<WeatherWidget />);
});