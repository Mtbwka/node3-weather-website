const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYnVyYW4tMSIsImEiOiJjanZzZnM3cDkwcTRyNGJtczBmMDJzdTUxIn0.lKSoEyb--thLpdWJh3_o0g&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to the API!');
    } else if (body.features.length === 0) {
      callback('No matching results. Try another search.');
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
