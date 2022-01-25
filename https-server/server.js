//import necessary express
const express = require("express");
//create an instance of express
const app = express();
//create port variable for easier config down the line
port = 8080;
//create a varible to store the response we will send
const requestListener = function (req, res) {
  //http code signifying success
  res.writeHead(200);
  //actual response
  res.end("Hello, World!");
};
//the endpoint that has been mapped
app.get("/", requestListener);
//setup server listenning port and initialise server at thta port
app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${process.env.PORT || port}`);
});
