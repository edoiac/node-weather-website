const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/5ceadd7541fead88d5ebeed278a89bb1/${latitude},${longitude}?units=si&lang=en`;
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('unable to connect to the server', undefined);
        } else if (response.body.error) {
            callback('unable to find the location', undefined);
        } else {
            callback(undefined, response.body.daily.data[0].summary + ' In this moment there are ' + response.body.currently.temperature + ' degrees outside. Chances of rain are ' + response.body.currently.precipProbability + '%')
        }
    })
};

module.exports = forecast;