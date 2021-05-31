const express = require("express");
const app = express(); // initialize app
const fsPromises = require("fs").promises;
var result;
const directory = "images/";
const { v4: uuidv4 } = require("uuid");
const fsExtra = require("fs-extra");
const multer = require("multer");
const fs = require("fs");
var Tesseract = require("tesseract.js");
app.use(express.static("public"));
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

app.post("/upload", (req, res) => {
  console.log(req.file);
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.send("Something went wrong");
    }

    var image = fs.readFileSync(__dirname + "/images/" + filePath, {
      encoding: null,
    });
    Tesseract.recognize(image, "eng", { logger: (m) => console.log(m) }).then(
      ({ data: { text } }) => {
        console.log(text);
        result = text;
        res.redirect("/showdata");
      }
    );
  });
});
app.get("/showdata", async (req, res) => {
  if (!result) {
    res.redirect("/");
  }

  await fsExtra.emptyDirSync(directory);
  res.render("result.ejs", { text: result });
});
app.get("/", (req, res) => {
  console.log();
  res.render("index.ejs");
});
app.listen(3000, () => {
  console.log("Server started at 3000");
});
