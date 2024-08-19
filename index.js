import express from "express";
import { config } from "dotenv";
const app = express();
config();

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
  });
});
app.listen(process.env.PORT, () => console.log("server up and running "));
