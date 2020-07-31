const request = require("request");

const forecast = (city, callback) => {
  const KEY = "7d2fe1b3854f9b4c472912c06e8dc830";
  const url = `http://api.weatherstack.com/current?access_key=${KEY}&query=${city}`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (response.body.error) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(undefined, response);
    }
  });
};

module.exports = forecast;
