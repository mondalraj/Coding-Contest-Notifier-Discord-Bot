const puppeteer = require("puppeteer");

const scrapeCodechefContests = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(
    "https://www.codechef.com/contests?itm_medium=navmenu&itm_campaign=allcontests/"
  );

  // Execute code in the DOM
  const data = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#future-contests-data > tr")).map(
      (hack) => ({
        name: hack.querySelector("td:nth-child(2)").innerText.trim(),
        organizer: "Codechef",
        orgLogo:
          "https://afiles.webengage.com/~7168057d/37f83f57-26ef-4711-9399-b80081a9bbae.jpg",
        date: hack
          .querySelector("td:nth-child(3)")
          .innerText.trim()
          .split("\n")[0],
        time: hack
          .querySelector("td:nth-child(3)")
          .innerText.trim()
          .split("\n")[1],
        duration: hack.querySelector("td:nth-child(4)").innerText.trim(),
        url: hack.querySelector("td:nth-child(2) > a").href,
      })
    )
  );

  await browser.close();

  return data;
};

exports.default = scrapeCodechefContests;
