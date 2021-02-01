//this module converts a given module name to its parent distro

//reading the two json files to be used for conversion
const coreModules = require('../data/core-modules.json');
const moduleDistroMap = require('../data/module-distro-map.json');

function moduleToDistro(module) {
    if (coreModules.includes(module) || module == 'perl') return null;

    if (module in moduleDistroMap) return moduleDistroMap[module];

    //if module is not a core module or is not in module-distro-map:
    throw new Error(`Could not find the parent distro to module "${module}"`);
}

module.exports = moduleToDistro;