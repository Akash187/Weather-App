// const yargs = require('yargs');
// const geocode = require('./geocode/geocode');
//
// const argv = yargs
//     .options({
//         a: {
//             demand: true,
//             alias: 'address',
//             describe: 'Address to fetch weather for',
//             string: true
//         }
//     })
//     .help()
//     .alias('help', 'h')
//     .argv;
//
// geocode.geocodeAddress(argv.address, (errorMessage, results) => {
//     if (errorMessage) {
//         console.log(errorMessage);
//     } else {
//         console.log(JSON.stringify(results, undefined, 2));
//     }
// });
//
// //See Asynchronous code in Action.
//
// // console.log("Printing Dummy Data 1");
// // console.log("Printing Dummy Data 2");
// // console.log("Printing Dummy Data 3");

const request = require('request');

const key = '20304c4f86cd1b78d50d2817ebc867c7';

request({
    url: `https://api.darksky.net/forecast/${key}/25.2909513%2082.9961053?units=si`,
    json: true
}, (error, response, body) => {
    console.log('statusCode:', response && response.statusCode);
    if (!error && response.statusCode === 200) {
        console.log('Temperature(°C): ', body.currently.temperature);
    }else {
        console.log('Unable to fetch weather.');
    }
});
