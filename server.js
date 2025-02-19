import express from "express";
import puppeteer from "puppeteer";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/goals", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: "URL mandatory" });
  }

  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "domcontentloaded" });

    const goals = await page.evaluate(() => {
      const selector = ".StatsBlock-module--RonaldoStatsBlock--f266e span.StatsBlock-module--largeNum--0abfd";
      return document.querySelector(selector)?.innerText.trim() || "Goals not found";
    });

    await browser.close();
    res.json({ goals });
  } catch (error) {
    res.status(500).json({ error: "Error fetching goals", detail: error });
  }
});

app.listen(3000, () => console.log("Server running on port 3000..."));
