const axios = require('axios');
const yargs = require('yargs');

const API_KEY = 'AIzaSyA38PSV8kdR_hantdt1_5yxHHZiYd8p9rA';
const GOOGLE_ENDPOINT = "https://maps.googleapis.com/maps/api/geocode/json";

const COUNTIES = {
    'VA': {
        'Greene County': 'VAC079',
        'Greensville County': 'VAC081',
        'Halifax County': 'VAC083',
        'Hanover County': 'VAC085',
        'Henrico County': 'VAC087'
    }
}

// Function to fetch geocode for an address
const geocodeAddress = async (address) => {
  try {
    let params = {
      address: address,
      key: API_KEY,
    };
    const { data } = await axios.get(`${GOOGLE_ENDPOINT}`, { params });
    const addr = data.results[0].address_components;
    const lat = data.results[0].geometry.location.lat;
    const lng = data.results[0].geometry.location.lng;
    let county = '';
    let state = '';
    let noaaOutput = '';

    for (let i = 0; i < addr.length; i++){
        if (addr[i].long_name.includes('County')){
            county = addr[i].long_name; // e.g. Hanover County
        }
        if (addr[i].types[0] === 'administrative_area_level_1'){
            state = addr[i].short_name; // e.g. VA
        }
    }

    if (county !== '' && state !== ''){
        try {
            noaaOutput = COUNTIES[state][county];
        } catch (error) {
            console.log('This county was not found in the database.')
        }
    }

    console.log(`Requested address: ${address}`);
    console.log(`Latitude: ${lat}`);
    console.log(`Longitude: ${lng}`);
    console.log(`${county} with an NOAA code of >> ${noaaOutput} <<`);

  } catch (err) {
    console.log("Error fetching coordinates: ", err);
  }
};

yargs
  .command(
    'geocode <address>',
    'Get the latitude and longitude for a given address',
    (yargs) => {
      yargs.positional('address', {
        describe: 'Address to geocode',
        type: 'string',
      });
    },
    async (argv) => {
      const { address } = argv;
      await geocodeAddress(address);
    }
  )
  .help()
  .alias('help', 'h')
  .argv;