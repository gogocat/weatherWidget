import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const mockGeolocation = {
    getCurrentPosition: jest.fn().mockImplementationOnce(success =>
        Promise.resolve(
            success({
                coords: {
                    latitude: 51.1,
                    longitude: 45.3
                }
            })
        )
    )
};

global.navigator.geolocation = mockGeolocation;

configure({ adapter: new Adapter() });
