const axios = require('axios');
const dotEnv = require('dotenv');

dotEnv.config(); // Load variables from .env
const LOCATIONIQ_KEY = process.env.API_KEY; // Access the API_KEY from .env file


/////////////////////////////////
//    Initial Implementation   //
/////////////////////////////////

// input: query: string
// result:l Promise<Location{}>
const findLatitudeAndLongitude = (query) => {
  // let latitude, longitude;
  return axios.get('https://us1.locationiq.com/v1/search.php',
    {
      params: {
        key: LOCATIONIQ_KEY,
        q: query,
        format: 'json'
      }
    })
    .then( (response) => {
      // latitude = response.data[0].lat;
      // longitude = response.data[0].lon;
      // console.log(response.data[0]);
      // {
      //   place_id: '309423810',
      //   licence: 'https://locationiq.com/attribution',
      //   osm_type: 'relation',
      //   osm_id: '237385',
      //   boundingbox: [ '47.4810022', '47.7341503', '-122.459696', '-122.224433' ],
      //   lat: '47.6038321',
      //   lon: '-122.330062',
      //   display_name: 'Seattle, King County, Washington, USA',
      //   class: 'boundary',
      //   type: 'administrative',
      //   importance: 0.9456641497695182,
      //   icon: 'https://locationiq.org/static/images/mapicons/poi_boundary_administrative.p.20.png'
      // }
      // console.log('success in findLatitudeAndLongitude!', latitude, longitude);
      const { lat, lon } = response.data[0];
      return {
        latitude: lat,
        longitude: lon
      };
    })
    .catch( (error) => {
      console.log('error in findLatitudeAndLongitude!');
      // console.log(error); // If we want to see more info about the issue
      throw error;
    });

  // return {
  //   seattleLat: latitude,
  //   seattleLon: longitude

  // };
};

// input: latitute:string, longitute: string
// returns: Promise<Place{}>
const findLocation = (latitude, longitude) => {
  axios.get('https://us1.locationiq.com/v1/reverse.php',
    {
      params: {
        key: LOCATIONIQ_KEY,
        format: 'json',
        lat: latitude,
        lon: longitude
      }
    })
    .then( (response) => {
      console.log('success in findLocation!', response.data);
      return response.data;
    })
    .catch( (error) => {
      console.log('error in findLocation!');
      console.log(`${error}`);
      // throw error;
      // console.log(error); // If we want to see more info about the issue
    });
};

// const seattleCoordinates = findLatitudeAndLongitude('Seattle, Washington, USA');
// console.log('seattleCoordinates --- ', seattleCoordinates); // seattleCoordinates ---  { seattleLat: undefined, seattleLon: undefined }
// // seattleLat and seattleLon is undefined
// const locations = findLocation(seattleCoordinates.seattleLat, seattleCoordinates.seattleLon);
// console.log(locations);
// // undefined
// // error in findLocation!
// // success in findLatitudeAndLongitude! 47.6038321 -122.330062

// findLatitudeAndLongitude('Seattle, Washington, USA')
//   .then(location => {
//     console.log(location); // { latitude: '47.6038321', longitude: '-122.330062' }
//   });

// input: query: string
// returns: Promise>Place{}>
const getLocationFromQuery = query => {
  // need to put return here, if not, it returns undefined
  return findLatitudeAndLongitude(query)
    .then(location => {
      return findLocation(location.latitude, location.longitude);
    });
};

getLocationFromQuery('Seattle, WA')
  .then(place => {
    console.log(place);
  });



// /////////////////////////////////
// // Refactoring: Utilize `then` //
// /////////////////////////////////

// const getLocationFromQuery = (query) => {
//   // Make the first API call to get latitude and longitude
//   findLatitudeAndLongitude(query)
//     .then((response) => {
//       // `response` is the data returned from the findLatitudeAndLongitude promise

//       // Make the next API call here, where we can use the `response` data from the previous call
//       findLocation(response.latitude, response.longitude);
//     })
//     .catch((error) => {
//       console.log('getLocationFromQuery: error fetching location from query!');
//       // console.log(error); // If we want to see more info about the issue
//     });
// };

// const findLatitudeAndLongitude = (query) => {
//   let latitude, longitude;

//   // Return the promise chain created by the axios call
//   return axios.get('https://us1.locationiq.com/v1/search.php',
//     {
//       params: {
//         key: LOCATIONIQ_KEY,
//         q: query,
//         format: 'json'
//       }
//     })
//     .then((response) => {
//       latitude = response.data[0].lat;
//       longitude = response.data[0].lon;
//       console.log('success in findLatitudeAndLongitude!', latitude, longitude);

//       return {latitude, longitude}; // Return the data we want to pass on
//     })
//     .catch((error) => {
//       console.log('error in findLatitudeAndLongitude!');
//       // console.log(error); // If we want to see more info about the issue
//     });
// };

// const findLocation = (latitude, longitude) => {
//   axios.get('https://us1.locationiq.com/v1/reverse.php',
//     {
//       params: {
//         key: LOCATIONIQ_KEY,
//         format: 'json',
//         lat: latitude,
//         lon: longitude
//       }
//     })
//     .then((response) => {
//       console.log('success in findLocation!', response.data);
//     })
//     .catch((error) => {
//       console.log('error in findLocation!', error);
//       // console.log(error); // If we want to see more info about the issue
//     });
// };

// getLocationFromQuery('Seattle, Washington, USA');
