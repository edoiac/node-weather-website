const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZWRvYXJkb2lhY29ubyIsImEiOiJjanpvM3Fwc3cwMWdzM2JwOWw4OXA3MzE1In0.jQm048v1-yzBRc2c7eyj-g`;
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('unable to connect the server', undefined)
        } else if (response.body.features.length === 0) {
            callback('location not found', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
};

module.exports = geocode;
