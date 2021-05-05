// Full Documentation - https://docs.turbo360.co
const vertex = require("vertex360")({ site_id: process.env.TURBO_APP_ID });
const express = require("express");
const docx = require("docx");
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
  const doc = new docx.Document({
    sections: [
      {
        properties: {},
        children: [
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: result,
                bold: true,
              }),
              new docx.TextRun({
                text: "\tMade by Aditya Sharma",
                bold: true,
              }),
            ],
          }),
        ],
      },
    ],
  });
  //console.log("Flagged");
  // Used to export the file into a .docx file
  docx.Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("results/result.docx", buffer);
  });
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
//const api = require("./routes/api"); // sample API Routes

// set routes
//app.use("/", index);
//app.use("/api", api); // sample API Routes

module.exports = app;
