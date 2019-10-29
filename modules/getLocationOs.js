const rp = require('request-promise');

const getLocationOs = (query) => {
    const token = process.env.API_TOKEN // GET YOUR TOKEN FROM MAPBOX API
    const locationUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${token}&cachebuster=1567505858379&autocomplete=true`;

    return rp(locationUrl)
        .then(function (html) {
            const result = JSON.parse(html);
            const longitude = result.features[0].center[0];
            const latitude = result.features[0].center[1];
            return {
                latitude,
                longitude
            };
        })
        .catch(function (err) {
            console.log(err);
        });
}

module.exports = getLocationOs;
