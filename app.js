const request = require('request');
const yargs = require('yargs');

const key = 'AIzaSyBxU9MTrAHV1ivTuOQA_yaoH779S2lN2QI';

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

console.log(argv);

let encodedAddress = encodeURIComponent(argv.a);

request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${key}`,
    json: true
}, (error, response, body) => {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    if(body.results[0]) {
        console.log('Address: ', body.results[0].formatted_address);
        console.log('Latitude: ', body.results[0].geometry.location.lat);
        console.log('Longitude: ', body.results[0].geometry.location.lng);
    }else {
        console.log("Status : " + body.status);
    }
});


