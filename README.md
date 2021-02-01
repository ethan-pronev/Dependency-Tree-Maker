# Instructions
This application runs in the Node.js environment. Ensure the latest version of Node is installed.
1. Navigate to /ActiveState-Assignment and install all required packages:
```sh
npm install
```
2. The metadata for every distro is located in /ActiveState-Assignment/data. Choose which of these you would like to create dependency trees for.

3. Navigate to /src to run the program and include any `--name` flags corresponding to distro names:
```sh
cd ./src
node index --DateTime --Class-Load
```

### Testing
There are included tests for the createTree and moduleToDistro modules. Test data has been added to the /data folder as well as appended to ./data/core-modules.json and ./data/module-distro-map.json. Tests can be run by navigating to ActiveState-Assignment and runnng:
```sh
npm run test
```