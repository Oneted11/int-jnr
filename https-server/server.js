//plain nodejs server, no express used
//import necessary inbuilt node module
const https = require("https");
// import modue to read from filesystem
const fs = require("fs");
//create port variable for easier config down the line
port = 8081;
// add options object to store loaded tls certificates
const options = {
  key: fs.readFile("./localhost.key", (err) => console.log("error: ", err)),
  cert: fs.readFile("./localhost.crt", (err) => console.log("error: ", err)),
};

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end("Hello, World!");
};

const server = https.createServer(options, requestListener);
console.log(`server runing on port ${port}`);
server.listen(port);
