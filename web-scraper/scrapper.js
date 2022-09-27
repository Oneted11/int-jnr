// import puppeteer
const puppeteer = require("puppeteer");
// create a logger for debugging
const logger = (stuff) => console.table(stuff);
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
//trying new method using match
const getAllText2 = async () => {
  //create intance of puppeteer
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = (await browser.pages())[0];
  await page.goto(website);
  //extraction logic, might change a bunch of times
  const extractedText = await page.$eval("*", (el) => el.innerText);
  // format extracted text into a clean-ish array
  const textArray = extractedText.match(/[^\n\t\r0-9\!\:\.\)\(\,]/gi).join("");

  return textArray;
  //close the browser instance once done
  await browser.close();
};

const wordArray = getAllText2();
//wait for all promises to resolve so as to manipulate data
Promise.all([wordArray]).then((values) => {
  logger(
    "got here **********************************************************************"
  );
  logger(values[0]);
  // turn array of chars back to string
  const uncleanData = values[0].toString();
  console.log("uncleanData>>>>>>>>>>>>", uncleanData);
  // split the string by spaces to get words
  const DataArr = uncleanData.split(" ");
  logger(DataArr);

  const data = DataArr.map((item) => {
    return item.replace(".", " ").split(" ");
  }).flat(Infinity);
  // new set data
  logger(data);
  const counts = {};
  for (const word of DataArr) {
    counts[word] = counts[word] ? counts[word] + 1 : 1;
  }
  logger(counts);
});
