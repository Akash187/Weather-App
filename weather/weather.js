const request = require('request');

const fs = require('fs');
const key = JSON.parse(fs.readFileSync('keys.json')).weatherKey;

let getWeather = (latitude, longitude, callback) => {

    //uncomment below line to se Asynchronous node
    //console.log('This is a dummy text from weather.js');

    request({
        url: `https://api.darksky.net/forecast/${key}/${latitude},${longitude}?units=si`,
        json: true
    }, (error, response, body) => {
        callback(`Weather StatusCode: ${response && response.statusCode}`);
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                }
            );
        } else {
            console.log('Unable to fetch weather.');
        }
    })
};

module.exports = {
    getWeather
};