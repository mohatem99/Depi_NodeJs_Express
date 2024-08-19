import express from "express";
import { config } from "dotenv";
const app = express();
config();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
  });
});
app.post("/", (req, res) => {
  console.log(req.body);
  res.status(201).json({
    status: "success",
    msg: "Post request",
  });
});
app.listen(process.env.PORT, () => console.log("server up and running "));
