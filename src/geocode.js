require('dotenv').config();
const axios = require('axios');
const yargs = require('yargs');

const API_KEY = process.env.API_KEY;
const GOOGLE_ENDPOINT = "https://maps.googleapis.com/maps/api/geocode/json";
const NWS_ENDPOINT = "https://api.weather.gov/zones";

// Function to fetch geocode for an address
const geocodeAddress = async (address) => {
  try {
    const params = {
      address: address,
      key: API_KEY,
    };
    const { data } = await axios.get(`${GOOGLE_ENDPOINT}`, { params });
    const lat = data.results[0].geometry.location.lat;
    const lng = data.results[0].geometry.location.lng;
    let nwsCode = '';
    let nwsData;

    if (lat !== '' && lng !== ''){
      try {
        const NWSParams = {
          point: `${lat},${lng}`
        }
        nwsData  = await axios.get(NWS_ENDPOINT, {
          params: NWSParams
        });
        nwsCode = nwsData.data.features[0].properties.id;
      } catch (error) {
        console.log(error);
      }
    }

    console.log(`Searching: ${address} ...\n`);
    console.log('/////////////////////////////////////////')
    console.log(`Latitude: ${lat}`);
    console.log(`Longitude: ${lng}`);
    console.log(`NWS Code: ${nwsCode}`);
    console.log('/////////////////////////////////////////')

  } catch (err) {
    console.log("Error fetching coordinates: ", err);
  }
};


// Defines the cli command required
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