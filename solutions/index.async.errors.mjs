import axios from 'axios';
import dotEnv from 'dotenv';

dotEnv.config(); // Load variables from .env
const LOCATIONIQ_KEY = process.env.API_KEY; // Access the API_KEY from .env file


// input: query: string
// returns: Promise<{ latitude: string, longitude: string}>
const findLatitudeAndLongitude = async query => {
  try {
    const response = await axios.get('https://us1.locationiq.com/v1/search.php',
      {
        params: {
          // key: LOCATIONIQ_KEY,
          q: query,
          format: 'json'
        }
      });

    const { lat: latitude, lon: longitude } = response.data[0];
    return { latitude, longitude };
  } catch (error) {
    console.log(`findLatitudeAndLongitude: ${error}`);
    throw error;
  }
};

// input: latitude: string, longitude: string
// returns: Promise<Location{}>
const findLocation = async (latitude, longitude) => {
  try {
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
  } catch (error) {
    console.log(`findLocation: ${error}`);
    throw error;
  }
};

// input: query: string
// returns: Promise<Location{}>
const getLocationFromQuery = async query => {
  try {
    const { latitude, longitude } = await findLatitudeAndLongitude(query);
    return findLocation(latitude, longitude);
  } catch (error) {
    console.log(`getLocationFromQuery: ${error}`);
    throw error;
  }
};

try {
  const location = await getLocationFromQuery('Seattle, Washington, USA');
  console.log(location);
} catch (error) {
  console.log(`main: ${error}`);
}
