//plain nodejs server, no express used
//import necessary inbuilt node module
const https = require("https");
// import modue to read from filesystem
const fs = require("fs");
//create port variable for easier config down the line
port = 8080;
// add options object to store tls certificates
const options = {};

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end("Hello, World!");
};

const server = https.createServer(requestListener);
console.log(`server runing on port ${port}`);
server.listen(port);
