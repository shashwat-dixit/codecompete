import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("CodeCompete");
});

app.listen("3000", () => {
  console.log(`Server running on http://localhost:3000`);
});
