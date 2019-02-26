import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
global.fetch = require('jest-fetch-mock');


const mockGeolocation = {
    getCurrentPosition: jest.fn().mockImplementationOnce(success =>
        Promise.resolve(
            success({
                coords: {
                    latitude: -100,
                    longitude: 100
                }
            })
        )
    )
};

global.navigator.geolocation = mockGeolocation;

configure({ adapter: new Adapter() });
