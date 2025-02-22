import express from "express";
import puppeteer from "puppeteer";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/goals", async (req, res) => {
  const cC = 5;
  const k = s => s.split("").map(c => String.fromCharCode(c.charCodeAt() - cC)).join("");
  const h = "myyux?44|||3rjxxn{xwtsfqit3fuu4uflj2ifyf4nsij}4uflj2ifyf3oxts";
  const url = k(h);

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on("request", (request) => {
      if (request.url() === url) {
        request.continue();
      } else {
        request.abort();
      }
    });

    await page.goto(url, { waitUntil: "domcontentloaded" });

    const goals = await page.evaluate(() => {
      return JSON.parse(document.body.innerText)
        ?.result
        ?.data
        ?.allSheetRonaldoAllTimeStats
        ?.edges?.[0]
        ?.node
        ?.goals || "Goals not found";
    });

    await page.close();
    await browser.close();
    res.json({ goals });
  } catch (error) {
    res.status(500).json({ error: "Error fetching goals", detail: error });
  }
});

app.listen(3000, () => console.log("Server running on port 3000..."));
