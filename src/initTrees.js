//this module initializes a dependency tree for each distro in the data folder
 
const fs = require('fs');
const path = require('path');

// Get list of distro names in the data directory
let distroNames = fs.readdirSync(`${__dirname}/../data`);

let distroObj = {};
distroNames.forEach((distro) => { 
    if (path.extname(distro) != ".json") { //so we don't indlude the two json files in the data directory (core-modules & module-distro-map)
        distroObj[distro] = null;
    }
});

module.exports = distroObj;