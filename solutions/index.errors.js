const axios = require('axios');
const dotEnv = require('dotenv');

dotEnv.config(); // Load variables from .env
const LOCATIONIQ_KEY = process.env.API_KEY; // Access the API_KEY from .env file


// input: query: string
// returns: Promise<{ latitude: string, longitude: string}>
const findLatitudeAndLongitude = query => {
  return axios.get('https://us1.locationiq.com/v1/search.php',
    {
      params: {
        key: LOCATIONIQ_KEY,
        q: query,
        format: 'json'
      }
    })
    .then(response => {
      const { lat: latitude, lon: longitude } = response.data[0];
      return { latitude, longitude };
    })
    .catch(error => {
      console.log(`findLatitudeAndLongitude: ${error}`);
      throw error;
    });
};

// input: latitude: string, longitude: string
// returns: Promise<Location{}>
const findLocation = (latitude, longitude) => {
  return axios.get('https://us1.locationiq.com/v1/reverse.php',
    {
      params: {
        key: LOCATIONIQ_KEY,
        format: 'json',
        lat: latitude,
        lon: longitude
      }
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(`findLocation: ${error}`);
      throw error;
    });
};

// input: query: string
// returns: Promise<Location{}>
const getLocationFromQuery = query => {
  return findLatitudeAndLongitude(query)
    .then(({ latitude, longitude }) => {
      return findLocation(latitude, longitude);
    })
    .catch(error => {
      console.log(`getLocationFromQuery: ${error}`);
      throw error;
    });
};

getLocationFromQuery('Seattle, Washington, USA')
  .then(location => {
    console.log(location);
  })
  .catch(error => {
    console.log(`main: ${error}`);
  });
