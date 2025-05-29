import axios from 'axios';
import dotEnv from 'dotenv';

dotEnv.config(); // Load variables from .env
const LOCATIONIQ_KEY = process.env.API_KEY; // Access the API_KEY from .env file


// input: query: string
// returns: Promise<{ latitude: string, longitude: string}>
const findLatitudeAndLongitude = async query => {
  const response = await axios.get('https://us1.locationiq.com/v1/search.php',
    {
      params: {
        key: LOCATIONIQ_KEY,
        q: query,
        format: 'json'
      }
    });

  const { lat: latitude, lon: longitude } = response.data[0];
  return { latitude, longitude };
};

// input: latitude: string, longitude: string
// returns: Promise<Location{}>
const findLocation = async (latitude, longitude) => {
  const response = await axios.get('https://us1.locationiq.com/v1/reverse.php',
    {
      params: {
        key: LOCATIONIQ_KEY,
        format: 'json',
        lat: latitude,
        lon: longitude
      }
    });

  return response.data;
};

// input: query: string
// returns: Promise<Location{}>
const getLocationFromQuery = async query => {
  const { latitude, longitude } = await findLatitudeAndLongitude(query);
  return findLocation(latitude, longitude);
};

const location = await getLocationFromQuery('Seattle, Washington, USA');
console.log(location);