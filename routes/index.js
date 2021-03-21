const express = require("express");
const router = express.Router();
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

router.post("/upload", (req, res) => {
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
    Tesseract.recognize(image)
      .progress(function (p) {
        console.log("progress", p);
      })
      .then(function (result) {
        res.send(result.html);
      });
  });
});
router.get("/showdata", (req, res) => {});
router.get("/", (req, res) => {
  res.render("index.ejs");
});
module.exports = router;
