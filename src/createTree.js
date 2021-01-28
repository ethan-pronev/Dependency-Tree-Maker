//this module creates a fully-resolved dependency tree for a given distro, storing any subtrees for other distros along the way

const fs = require('fs');

//reading the two json files to be used later on for conversion
const coreModules = require('../data/core-modules.json');
const moduleDistroMap = require('../data/module-distro-map.json');

//initializes a dependency tree for each distro in the data folder
//prevents having to compute the same tree twice
let distroTrees = require('./initTrees');

function createDependencyTree(distroName) {
    if (distroTrees[distroName] != undefined) return distroTrees[distroName];

    const distroMetadata = JSON.parse(fs.readFileSync(`../data/${distroName}/META.json`));
    if (distroMetadata === undefined) {
        ;//throw error: distro not found in ../data
    }

    //when we convert required modules into required distros below, we store the distros in a set to avoid repeats
    let requiredDistroSet = new Set();

    const requiredModules = distroMetadata.prereqs.runtime.requires;
    for (const [key,value] of Object.entries(requiredModules)) {
        requiredDistroSet.add(moduleToDistro(key));
    }
    console.log(requiredDistroSet);
    
    //at the end, return distroTrees[distroName] = distroTree; (distroTree is the tree we construct for distroName)
}

function moduleToDistro(module) {
    return module;
    //edit this function to convert module to its parent distro

    //error: unknown module if module not found in either core-modules or module-distro-map
}

module.exports = createDependencyTree;