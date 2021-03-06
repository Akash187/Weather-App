const request = require('request');

const fs = require('fs');

const key = JSON.parse(fs.readFileSync('keys.json')).geocodeKey;

const geocodeAddress = (address, callback) =>
{
    let encodedAddress = encodeURIComponent(address);
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${key}`,
        json: true
    }, (error, response, body) => {
        callback(`GeoCode StatusCode: ${response && response.statusCode}`);
        if (error) {
            callback("Unable to connect to google servers.");
        } else if (body.status === "ZERO_RESULTS") {
            callback("Unable to find that address");
        } else if (body.status === 'OK') {
            callback(undefined,{
                Address: body.results[0].formatted_address,
                Latitude: body.results[0].geometry.location.lat,
                Longitude: body.results[0].geometry.location.lng
            });
        }
    });
};

module.exports ={
  geocodeAddress
};