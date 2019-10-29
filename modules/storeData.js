const fs = require('fs');

const storeData = (data, path) => {
    try {
        fs.writeFileSync(path, JSON.stringify(data));
        console.log(`Success! Stored ${data.length} elements`);
    } catch (err) {
        console.error(err)
    }
}

module.exports = storeData;
