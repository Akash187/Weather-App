const request = require('request');
request({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia',
    json: true
    }, (error, response, body) => {
    console.log('error:', error); // Print the error if one occurred

    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

    console.log('body:', body); // Print the HTML for the Google homepage.
    console.log(JSON.stringify(body, undefined, 2));
});
