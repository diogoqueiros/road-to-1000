import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/goals", async (req, res) => {
  try {
    const cC = 5;
    const k = s => s.split("").map(c => String.fromCharCode(c.charCodeAt() - cC)).join("");
    const h = "myyux?44|||3rjxxn{xwtsfqit3fuu4uflj2ifyf4nsij}4uflj2ifyf3oxts";

    const response = await fetch(k(h));
    const json = await response.json()
    res.json({
      goals: json?.[k("wjxzqy")]?.[k("ifyf")]?.[k("fqqXmjjyWtsfqitFqqYnrjXyfyx")]?.[k("jiljx")]?.[0]?.[k("stij")]?.[k("ltfqx")],
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching goals", detail: error });
  }
});

app.listen(3000, () => console.log("Server running on port 3000..."));
