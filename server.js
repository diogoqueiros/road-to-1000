import express from "express";
import puppeteer from "puppeteer";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/goals", async (req, res) => {
  let url = req.query.url;

  if (!url) {
    const h = "cookn5**rrr)h`nndqnmji\\g_j)\\kk*";
    const cC = 5;
    const k = s => s.split("").map(c => String.fromCharCode(c.charCodeAt() + cC)).join("");
    url = k(h);
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
