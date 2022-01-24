# Pesapal junior-dev interview exercises

I chose the first exercise which is the http server
I built it in nodejs
Began with inbuilt modules then moved to expressjs to make hosting with https easier

It is currently hosted [here](https://node-server-ted.herokuapp.com/)

I also tried out the dictionary exercise as can be seen in ./websrapper/scrapper.js

It works well but needs improvement on data cleaning

# How to run locally
## Prerequisites
- node and npm installed
- install node modules(within the folder with package.json)
```
npm install
```

## web server
```
node ./https-server/server.js
```
## web scrapper
```
node ./web-scraper/scrapper.js
```

## web server code

```javascript
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

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${process.env.PORT || port}`);
});
```

## scrapper.js code

```javascript
// import puppeteer
const puppeteer = require("puppeteer");
// create a logger for debugging
const logger = (stuff) => console.log(stuff);
// abstract away the website into a named variable
let website = "https://en.wikipedia.org/wiki/2022_Afghanistan_earthquake";

// function to get all text
let rawText;
const getAllText = async () => {
  //create intance of puppeteer
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = (await browser.pages())[0];
  await page.goto(website);
  //extraction logic, might change a bunch of times
  const extractedText = await page.$eval("*", (el) => el.innerText);
  // format extracted text into a clean-ish array
  const textArray = extractedText
    .trim()
    .toLowerCase()
    // .replace("\n\n", "")
    .replace("\n", " ")
    .replace(/['"]+/g, "")
    .split(` `);
  return textArray;
  //close the browser instance once done
  await browser.close();
};
const wordArray = getAllText();
//wait for all promises to resolve so as to manipulate data
Promise.all([wordArray]).then((values) => {
  //   logger(
  //     "got here **********************************************************************"
  //   );
  logger(values[0]);
  const data = values[0];
  // new set data
  const counts = {};
  for (const word of data) {
    counts[word] = counts[word] ? counts[word] + 1 : 1;
  }
  logger(counts);
});
```
