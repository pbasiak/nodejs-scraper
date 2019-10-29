const rp = require('request-promise');
const $ = require('cheerio');
const getLocationOs = require('../modules/getLocationOs');

const frontendDataUrl = 'https://github.com/benmvp/frontend-confs';

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const extendFrontendData = (frontendData) => {
    const requests = frontendData.map((item) => {
        return getLocationOs(item.country).then(data => {
            return {
                ...item,
                lat: data.latitude,
                long: data.longitude,
            };
        }, data => {
            return { item };
        });
    });

    return Promise.all(requests);
};

function getFrontendData(callback) {
    rp(frontendDataUrl)
        .then(function (html) {
            const data = [];

            $('.markdown-body table tbody tr', html).each(function (i, item) {
                const name = $(item).children('td:nth-child(1)').text();
                const url = $(item).children('td:nth-child(1)').children('a').attr('href');
                const location = $(item).children('td:nth-child(2)').text().split(',');
                const city = location[0];
                const country = String(location[1]).trim();
                const date = $(item).children('td:nth-child(3)').text().replace(',', '').split(' ');
                const start_date = `${date[0]}.${date[1]}.${date[date.length - 1]}`;

                for (i = 0; i < monthNames.length; i++) {
                    if (monthNames[i] === start_date[0]) {
                        start_date[0] = i + 1;
                    }
                }

                const dataItem = {
                    name: name,
                    url: url,
                    city: city,
                    country: country,
                    start_date: start_date,
                    category: 'frontend',
                    lat: '',
                    long: '',
                };

                if (Number(date[date.length - 1]) < Number(2019)) {
                    return;
                }

                data.push(dataItem);
            });
            return extendFrontendData(data).then(result => {
                return callback(result);
            })
        })
        .catch(function (err) {
            console.log(err);
        });
}

module.exports = getFrontendData;
