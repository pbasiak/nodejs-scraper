const storeData = require('./modules/storeData');
const getFrontendData = require('./modules/getFrontendData');
const dotenv = require('dotenv');
dotenv.config();

const frontendDataPath = './data/frontendData.json';

getFrontendData(function (frontendData) {
    storeData(frontendData, frontendDataPath);
});
