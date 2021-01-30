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

//optionally, write to file output.json
//fs.writeFileSync('output.json', JSON.stringify(output, null, 2) , 'utf-8');