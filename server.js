const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=679b913ddb014617bcc93a0bb89ee1ee"
    );
    const data = response.data;
    res.render("index", { news: data.articles });
  } catch (error) {
    console.error("Error fetching news: ", error);
    res.status(500).send("Error fetching news. Please try again later");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
