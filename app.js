const express = require("express");
const app = express();
const fsPromises = require("fs").promises;
require("dotenv").config();
var result;
const directory = "images/";
const { v4: uuidv4 } = require("uuid");
const fsExtra = require("fs-extra");
const multer = require("multer");
const fs = require("fs");
const mindee = require("mindee");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

var Tesseract = require("tesseract.js");
app.use(express.static("public"));
const mindeeClient = new mindee.Client({
  apiKey: "ce5af6b2fba058822463fcd724f081cb",
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

app.post("/upload", async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error("Error during upload:", err);
        return res.send("Something went wrong");
      }
      console.log("else inside upload");
      var image = fs.readFileSync(__dirname + "/images/" + filePath, {
        encoding: null,
      });

      // Assuming this part was missing in the previous snippet
      try {
        const {
          data: { text },
        } = await Tesseract.recognize(image, "eng");
        result = text;
      } catch (tesseractError) {}

      // Retrieve the selected API value from the form
      const selectedApi = req.body.selectedApi;

      var doc;
      try {
        switch (selectedApi) {
          case "Invoice":
            // Call the Mindee API for Invoice
            doc = mindeeClient.docFromPath(__dirname + "/images/" + filePath);
            var resp = await doc.parse(mindee.InvoiceV4);
            console.log("resp of invoice", resp);
            break;

          case "Receipt":
            // Call the Mindee API for Receipt
            doc = mindeeClient.docFromPath(__dirname + "/images/" + filePath);
            var resp = await doc.parse(mindee.ReceiptV3);
            break;

          case "Passport":
            // Call the Mindee API for Passport
            doc = mindeeClient.docFromPath(__dirname + "/images/" + filePath);
            var resp = await doc.parse(mindee.PassportV1);
            break;

          case "US Bank Check":
            // Call the Mindee API for US Bank Check (replace mindee with appropriate module)
            doc = mindeeClient.docFromPath(__dirname + "/images/" + filePath);
            var resp = await doc.parse(mindeeModule); // replace mindeeModule
            break;

          case "License Plates":
            // Call the Mindee API for License Plates (replace mindee with appropriate module)
            doc = mindeeClient.docFromPath(__dirname + "/images/" + filePath);
            var resp = await doc.parse(mindeeModule); // replace mindeeModule
            break;

          default:
            console.log("Unknown selected API:", selectedApi);
            break;
        }

        // Extracted data from Mindee response (modify this based on the Mindee API response structure)
        extractedData = resp.document.toString();

        // Process the extracted data to remove colon-separated lines at the beginning of each section
        extractedData = extractedData.replace(/:\s*[\s\S]*?(?=(\n|$))/g, "");

        console.log("extractedData from api", extractedData);
        res.redirect("/showdata");
      } catch (mindeeError) {
        console.error("Mindee API error:", mindeeError);
        res.send("Mindee API error");
      }
    });
  } catch (uploadError) {
    console.error("Error during upload processing:", uploadError);
    res.send("Error during upload processing");
  }
});

app.get("/showdata", async (req, res) => {
  if (!result) {
    res.redirect("/");
  }

  await fsExtra.emptyDirSync(directory);

  // Process the extracted data to remove headers, patterns, and tables
  const textOnly = extractedData
    .replace(/[^a-zA-Z0-9\s\n]/g, "") // Remove non-alphanumeric characters
    .replace(/\n\s*\n/g, "\n") // Remove empty lines
    .trim(); // Trim leading and trailing spaces

  res.render("result.ejs", { text: result, extractedData: textOnly });
});

app.get("/", (req, res) => {
  console.log();
  res.render("index.ejs");
});

app.listen(process.env.PORT, () => {
  console.log(`Server started ${process.env.PORT}`);
});
