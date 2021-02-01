//this module creates a fully-resolved dependency tree for a given distro, storing any subtrees for other distros along the way

const fs = require('fs');

//initializes a dependency tree for each distro in the data folder
//prevents having to compute the same tree twice
let distroTrees = require('./initTrees');

//converts module names to their parent distro name
const moduleToDistro = require('./moduleToDistro');

function createDependencyTree(distroName) {
    //if this tree was already computed for a previous subtask, we don't have to compute it again
    if (distroTrees[distroName] != undefined) return distroTrees[distroName];

    //tries to find the current distro's metadata, throws an error if not found, otherwise reads the metadata
    //${__dirname} is required before the directory for the tests in test.spec.js to work properly
    if (!(fs.existsSync(`${__dirname}/../data/${distroName}/META.json`))) {
        throw new Error(`Could not find metadata for distro "${distroName}"`)
    }
    const distroMetadata = JSON.parse(fs.readFileSync(`${__dirname}/../data/${distroName}/META.json`));

    //if this distro doesn't have a prereqs.runtime.requires key, there are no dependencies, so return an empty object
    if (!("prereqs" in distroMetadata) ||
        !("runtime" in distroMetadata.prereqs) ||
        !("requires" in distroMetadata.prereqs.runtime)) return {};

    //when we convert required modules into required distros below, we store the distros in a set to avoid repeats
    let requiredDistroSet = new Set();

    const requiredModules = distroMetadata.prereqs.runtime.requires;
    for (const [key,value] of Object.entries(requiredModules)) {
        requiredDistroSet.add(moduleToDistro(key));
    }

    //the tree construct for the current distro
    let distroTree = {};
    for (let requiredDistro of requiredDistroSet) {
        if (requiredDistro === null) continue; //this happens when moduleToDistro encounters either a module in core-modules or 'perl'
        distroTree[requiredDistro] = createDependencyTree(requiredDistro);
    }

    //memoization step: store tree for distroName to be accessed later if needed
    distroTrees[distroName] = distroTree;
    return distroTree;
}

module.exports = createDependencyTree;