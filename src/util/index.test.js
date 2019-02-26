import * as util from './index';

const mockGoogleApiResponse = {
    address_components: [
        {
            long_name: '15-23',
            short_name: '15-23',
            types: ['street_number']
        },
        {
            long_name: 'Orara Street',
            short_name: 'Orara St',
            types: ['route']
        },
        {
            long_name: 'Waitara',
            short_name: 'Waitara',
            types: ['locality', 'political']
        },
        {
            long_name: 'The Council of the Shire of Hornsby',
            short_name: 'Hornsby',
            types: ['administrative_area_level_2', 'political']
        },
        {
            long_name: 'New South Wales',
            short_name: 'NSW',
            types: ['administrative_area_level_1', 'political']
        },
        {
            long_name: 'Australia',
            short_name: 'AU',
            types: ['country', 'political']
        },
        {
            long_name: '2077',
            short_name: '2077',
            types: ['postal_code']
        }
    ],
    formatted_address: '15-23 Orara St, Waitara NSW 2077, Australia',
    geometry: {
        location: {
            lat: -33.7080847,
            lng: 151.1041711
        },
        location_type: 'ROOFTOP',
        viewport: {
            northeast: {
                lat: -33.7067357197085,
                lng: 151.1055200802915
            },
            southwest: {
                lat: -33.7094336802915,
                lng: 151.1028221197085
            }
        }
    },
    place_id: 'ChIJebvrRoWnEmsRrVHXOgmfFUw',
    plus_code: {
        compound_code: '74R3+QM Waitara, New South Wales, Australia',
        global_code: '4RRH74R3+QM'
    },
    types: ['street_address']
};

const mockWeatherData = {
    main: {
        temp: 293.96,
        pressure: 1020,
        humidity: 77,
        temp_min: 291.48,
        temp_max: 296.48
    },
    wind: {
        speed: 2.1,
        deg: 80
    },
    name: 'Waitara'
};

const xhrMockClass = {
    open: jest.fn(),
    send: jest.fn(),
    setRequestHeader: jest.fn(),
    readyState: 4,
    responseText: JSON.stringify(mockGoogleApiResponse)
};

window.XMLHttpRequest = jest.fn(() => xhrMockClass);

test('getAddressByLatLong should make XMLHttpRequest', () => {
    const result = util.getAddressByLatLong(-100, 100);
    expect(XMLHttpRequest).toHaveBeenCalledTimes(1);
    expect(result instanceof Promise).toBeTruthy();
});

describe('getUserLocalWeatherData', () => {
    beforeEach(() => {
        XMLHttpRequest.mockClear();
        fetch.resetMocks();
    });

    it('should call navigator.geolocation.getCurrentPosition', () => {
        fetch.mockResponseOnce(mockWeatherData);

        const userWeatherData = util.getUserLocalWeatherData('C');

        xhrMockClass.onreadystatechange();

        userWeatherData.then(data => {
            console.log('weather data: ', data);
        });

        expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
        expect(XMLHttpRequest).toHaveBeenCalledTimes(1);
    });
});
