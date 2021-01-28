const fs = require('fs');

const createDependencyTree = require('./createTree');

let input = process.argv.slice(2);
let output = {};

for (let i=0; i<input.length; i++) {
    if (input[i].startsWith('--')) {
        output[input[i].substring(2)] = createDependencyTree(input[i].substring(2));
    }
}

console.log(output);