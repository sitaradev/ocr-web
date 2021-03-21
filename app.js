// Full Documentation - https://docs.turbo360.co
const vertex = require("vertex360")({ site_id: process.env.TURBO_APP_ID });
const express = require("express");

const app = express(); // initialize app
var result = "";
const config = {
  views: "views", // Set views directory
  static: "public", // Set static assets directory
  logging: true,
};

const multer = require("multer");
const fs = require("fs");
var Tesseract = require("tesseract.js");

var Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname + "/images");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

var upload = multer({
  storage: Storage,
}).single("image");
//route

app.post("/upload", (req, res) => {
  console.log(req.file);
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.send("Something went wrong");
    }

    var image = fs.readFileSync(
      __dirname + "/images/" + req.file.originalname,
      {
        encoding: null,
      }
    );
    Tesseract.recognize(image, "eng", { logger: (m) => console.log(m) }).then(
      ({ data: { text } }) => {
        console.log(text);
        result = text;
        res.redirect("/showdata");
      }
    );
  });
});
app.get("/showdata", (req, res) => {
  res.render("result.ejs", { text: result });
});
app.get("/", (req, res) => {
  res.render("index.ejs");
});

vertex.configureApp(app, config);
app.set("view engine", "ejs");
app.use(express.json());
// import routes
const index = require("./routes/index");
const api = require("./routes/api"); // sample API Routes

// set routes
//app.use("/", index);
app.use("/api", api); // sample API Routes

module.exports = app;
