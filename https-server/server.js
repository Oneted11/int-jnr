//plain nodejs server, no express used
//import necessary express
const express = require("express");
//create port variable for easier config down the line
const app = express();
port = 8080;

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end("Hello, World!");
};
app.get("/", requestListener);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
