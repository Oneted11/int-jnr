// import puppeteer
const puppeteer = require("puppeteer");
// create a logger for debugging
const logger = (stuff) => console.log(stuff);
// abstract away the website into a named variable
let website = "https://scrapingant.com/blog/puppeteer-get-all-text";
// function to get all text
const getAllText = async () => {
  //create intance of puppeteer
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = (await browser.pages())[0];
  await page.goto(website);
  //extraction logic, might change a bunch of times
  const extractedText = await page.$eval("*", (el) => el.innerText);
  logger(extractedText);
  //close the browser instance once done
  await browser.close();
};
getAllText();
