const express = require("express");
const app = express(); // initialize app
const fsPromises = require("fs").promises;
require("dotenv").config();
var result;
const directory = "images/";
const { v4: uuidv4 } = require("uuid");
const fsExtra = require("fs-extra");
const multer = require("multer");
const fs = require("fs");
const mindee = require("mindee");

var Tesseract = require("tesseract.js");
app.use(express.static("public"));
const mindeeClient = new mindee.Client({
  apiKey: process.env.KEY,
});

function getFilePath(path) {
  var newId = uuidv4();
  newId = newId.substring(0, 13);
  var filePath = newId + "-" + path;
  return filePath;
}
var filePath;
var Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname + "/images");
  },
  filename: (req, file, callback) => {
    filePath = getFilePath(file.originalname);
    callback(null, filePath);
  },
});

var upload = multer({
  storage: Storage,
}).single("image");
//route

let extractedData;

app.post("/upload", (req, res) => {
  //console.log(req.file);
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.send("Something went wrong");
    }

    var image = fs.readFileSync(__dirname + "/images/" + filePath, {
      encoding: null,
    });
    await Tesseract.recognize(image, "eng", {
      logger: (m) => console.log(m),
    }).then(async ({ data: { text } }) => {
      result = text;

      // Now, call the Mindee API to extract invoice data
      const doc = mindeeClient.docFromPath(__dirname + "/images/" + filePath);
      const resp = await doc.parse(mindee.InvoiceV4);

      // Extracted data from Mindee response (modify this based on the Mindee API response structure)
      extractedData = resp.document.toString();

      // Process the extracted data to remove colon-separated lines at the beginning of each section
      extractedData = extractedData.replace(/:\s*[\s\S]*?(?=(\n|$))/g, "");

      res.redirect("/showdata");
      //res.render("result.ejs", { text: result });
    });
  });
});
app.get("/showdata", async (req, res) => {
  if (!result) {
    res.redirect("/");
  }

  await fsExtra.emptyDirSync(directory);
  res.render("result.ejs", { text: result, extractedData: extractedData });
});
app.get("/", (req, res) => {
  console.log();
  res.render("index.ejs");
});

app.listen(process.env.PORT, () => {
  console.log(`Server started ${process.env.PORT}`);
});
