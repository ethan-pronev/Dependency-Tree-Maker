//this module converts a given module name to its parent distro

//reading the two json files to be used for conversion
const coreModules = require('../data/core-modules.json');
const moduleDistroMap = require('../data/module-distro-map.json');

function moduleToDistro(module) {
    if (coreModules.includes(module) || module == 'perl') return null;

    if (module in moduleDistroMap) return moduleDistroMap[module];

    //add error: unknown module if module not found in either core-modules or module-distro-map
}

module.exports= moduleToDistro;