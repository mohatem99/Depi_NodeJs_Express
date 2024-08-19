import express from "express";
import { config } from "dotenv";

import fs from "fs";
const app = express();
config();

app.use(express.json());

app.get("/", (req, res) => {
  fs.readFile("./database.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(404).json({ status: "error", msg: err.message });
    }
    res.status(200).json({
      status: "success",
      data: JSON.parse(data),
    });
  });
});
app.post("/", (req, res) => {
  fs.readFile("./database.json", "utf8", (err, data) => {
    if (err) {
      return res.status(404).json({ status: "error", msg: err.message });
    }
    if (data) {
      let id;
      let parsedData = JSON.parse(data);
      let users = parsedData["users"];

      let largestId = Math.max(...users.map((el) => el.id));

      id = largestId + 1;
      let { name } = req.body;

      users.push({ id, name });
      console.log(users);

      fs.writeFile(
        "./database.json",

        JSON.stringify({ users }),
        (err) => {
          if (err)
            return res.status(404).json({ status: "error", msg: err.message });
          res
            .status(201)
            .json({ status: "success", msg: "addedd successfully" });
        }
      );
    }
  });
});
app.put("/:id", (req, res) => {
  const { name } = req.body;
  fs.readFile("./database.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(404).json({ status: "error", msg: err.message });
    }
    if (data) {
      let parsedData = JSON.parse(data);
      let users = parsedData["users"];
      users[users.findIndex((e) => e.id == req.params.id)].name = name;

      fs.writeFile(
        "./database.json",

        JSON.stringify({ users }),
        (err) => {
          if (err)
            return res.status(404).json({ status: "error", msg: err.message });
          res
            .status(201)
            .json({ status: "success", msg: "updated successfully" });
        }
      );
    }
  });
});
app.delete("/:id", (req, res) => {
  fs.readFile("./database.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(404).json({ status: "error", msg: err.message });
    }
    if (data) {
      let parsedData = JSON.parse(data);
      let users = parsedData["users"];
      users = users.filter((el) => el.id != req.params.id);

      fs.writeFile(
        "./database.json",

        JSON.stringify({ users }),
        (err) => {
          if (err)
            return res.status(404).json({ status: "error", msg: err.message });
          res
            .status(201)
            .json({ status: "success", msg: "deleted successfully" });
        }
      );
    }
  });
});

app.use("*", (req, res) => {
  res.status(404).json({
    status: "error",
    msg: `url not found ${req.url}`,
  });
});
app.listen(process.env.PORT, () => console.log("server up and running "));
