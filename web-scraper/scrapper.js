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
  logger(
    "got here **********************************************************************"
  );
  logger(values[0]);
  const data = values[0];
  // new set data
  const counts = {};
  for (const word of data) {
    counts[word] = counts[word] ? counts[word] + 1 : 1;
  }
  logger(counts);
});
