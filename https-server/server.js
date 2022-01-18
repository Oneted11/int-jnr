//plain nodejs server, no express used
//import necessary inbuilt node module
const http = require("http");
//create port variable for easier config down the line
port = 8080;

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end("Hello, World!");
};

const server = http.createServer(requestListener);
console.log(`server runing on port ${port}`);
server.listen(port);
