const axios = require('axios');
const yargs = require('yargs');
const fs = require('fs');

const geocodeKey = fs.readFileSync('geocodeKey.txt');
const weatherKey = fs.readFileSync('weatherKey.txt');

const argv = yargs
    .options({
        a: {
            default: "Durgakund Vranasi",
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

let encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${geocodeKey}`;

axios.get(geocodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address');
    }
    let latitude = response.data.results[0].geometry.location.lat;
    let longitude = response.data.results[0].geometry.location.lng;
    const weatherUrl = `https://api.darksky.net/forecast/${weatherKey}/${latitude},${longitude}?units=si`;
    console.log("Address : " + response.data.results[0].formatted_address);
    return axios.get(weatherUrl).then((response) => {
        let temperature = response.data.currently.temperature;
        let apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
    })
}).catch((e) => {
        if (e.code === 'ENOTFOUND') {
            console.log('Unable to connect to API servers.');
        } else {
            console.log(e.message);
        }
    }
);
