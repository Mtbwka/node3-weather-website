const request = require('request');

const forecast = (lat, lng, callback) => {
  const url = `https://api.darksky.net/forecast/30ed66b8f5b428ae575bbe87688df02e/${lat},${lng}?lang=en`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect!');
    } else if (body.error) {
      callback(body.error);
    } else {
      const { temperature, precipProbability } = body.currently;
      const { summary } = body.daily.data[0];

      callback(
        undefined,
        `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
