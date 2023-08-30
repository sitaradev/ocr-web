const express = require("express");
const app = express();
const fsPromises = require("fs").promises;
var result;
const directory = "images/";
const { v4: uuidv4 } = require("uuid");
const fsExtra = require("fs-extra");
const multer = require("multer");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
console.log("hello")
app.set('views', path.join(__dirname, "views"));
app.set('view engine','ejs'); 
app.engine('ejs', require('ejs').__express);
app.set("public", path.join(__dirname, "public"));

app.use(bodyParser.urlencoded({ extended: true }));

var Tesseract = require("tesseract.js");
app.use(express.static("public"));

// all different api keys----
const ALL_KEYS = {
  Invoice: "d895b172b16a6714ddc7bb22f26139b2",
  Receipt: "6c72791fa85f9950126506799f0cc936",
  Passport: "6c72791fa85f9950126506799f0cc936",
  USBankCheck: "2432938b71cfd0972ff6f0babc44e188",
  LicensePlates: "91f43c857ac89a01ba4da044f4924ac8",
};

function getFilePath(path) {
  var newId = uuidv4();
  newId = newId.substring(0, 13);
  var filePath = newId + "-" + path;
  return filePath;
}

var filePath;
var Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname + "/public/images");
  },
  filename: (req, file, callback) => {
    filePath = getFilePath(file.originalname);
    callback(null, filePath);
  },
});

var upload = multer({
  storage: Storage,
}).single("image");

var extractedData;
app.post("/upload", async (req, res) => {
  try {
    const mindee = require("./mindee");
    upload(req, res, async (err) => {
      if (err) {
        console.error("Error during upload:", err);
        return res.send("Something went wrong: "+err.message);
      }
      var image = fs.readFileSync(__dirname + "/public/images/" + filePath, {
        encoding: null,
      });

      // Retrieve the selected API value from the form
      const selectedApi = req.body.selectedApi;

      var doc;
      try {
        switch (selectedApi) {
          case "Invoice":
            console.log("Invoice");

            const invoiceClient = new mindee.Client({
              apiKey: ALL_KEYS.Invoice,
            });
            doc = invoiceClient.docFromPath(__dirname + "public/images/" + filePath);
            var resp = await doc.parse(mindee.InvoiceV4);
            console.log("resp of invoice", resp);
            break;

          case "Receipt":
            console.log("Receipt");
            const receiptClient = new mindee.Client({
              apiKey: ALL_KEYS.Invoice,
            });
            doc = receiptClient.docFromPath(__dirname + "/images/" + filePath);
            var resp = await doc.parse(mindee.InvoiceV4);
            console.log("resp of receipt", resp);
            break;

          case "Passport":
            console.log("Passport");

            // Call the Mindee API for Passport
            const passportClient = new mindee.Client({
              apiKey: ALL_KEYS.Invoice,
            });
            doc = passportClient.docFromPath(__dirname + "/images/" + filePath);
            var resp = await doc.parse(mindee.InvoiceV4);
            console.log("resp of Passport", resp);

          case "US Bank Check":
            console.log("US Bank Check");

            // Call the Mindee API for US Bank Check (replace mindee with appropriate module)
            const usBankClient = new mindee.Client({
              apiKey: ALL_KEYS.Invoice,
            });
            doc = usBankClient.docFromPath(__dirname + "/images/" + filePath);
            var resp = await doc.parse(mindee.InvoiceV4);
            console.log("resp of us bank", resp);

          case "License Plates":
            // Call the Mindee API for License Plates (replace mindee with appropriate module)
            const licensePlateClient = new mindee.Client({
              apiKey: ALL_KEYS.Invoice,
            });
            doc = licensePlateClient.docFromPath(
              __dirname + "/images/" + filePath
            );
            var resp = await doc.parse(mindee.InvoiceV4); //  License Plates not avalaible
            console.log("resp of receipt", resp);

          case "Video":
            // Call the Mindee API for License Plates (replace mindee with appropriate module)
            const videoClient = new mindee.Client({
              apiKey: ALL_KEYS.Invoice,
            });
            doc = videoClient.docFromPath(__dirname + "/images/" + filePath);
            var resp = await doc.parse(mindee.InvoiceV4); //  License Plates not avalaible
            console.log("resp of receipt", resp);

          case "License plates":
            // Call the Mindee API for License Plates (replace mindee with appropriate module)
            const LicenseClient = new mindee.Client({
              apiKey: ALL_KEYS.Invoice,
            });
            doc = LicenseClient.docFromPath(__dirname + "/images/" + filePath);
            var resp = await doc.parse(mindee.InvoiceV4); //  License Plates not avalaible
            console.log("resp of receipt", resp);

          default:
            console.log("Unknown selected API:", selectedApi);
            break;
        }

        // Extracted data from Mindee response (modify this based on the Mindee API response structure)
        extractedData = resp.document.toString();

        // Process the extracted data to remove colon-separated lines at the beginning of each section
        extractedData = extractedData.replace(/:\s*[\s\S]*?(?=(\n|$))/g, "");
        result = extractedData
        res.redirect("/result");
        return
      } catch (mindeeError) {
        console.error("Mindee API error:", mindeeError);
        res.send("Mindee API error");
      }
    });
  } catch (uploadError) {
    console.error("Error during upload processing:", uploadError.message);
    res.send("Error during upload processing: "+uploadError.message);
  }
});

app.get("/showdata", async (req, res) => {
  console.log("extractedData", extractedData);
  if (extractedData === undefined) {
    return;
  }
  if (!result) {
    res.redirect("/");
  }

  await fsExtra.emptyDirSync(directory);

  // Process the extracted data to remove headers, patterns, and tables
  const textOnly = extractedData
    .replace(/[^a-zA-Z0-9\s\n]/g, "") // Remove non-alphanumeric characters
    .replace(/\n\s*\n/g, "\n") // Remove empty lines
    .trim(); // Trim leading and trailing spaces

  res.render("success.ejs", { text: result, extractedData: textOnly });
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

// app.listen(5000, () => {
//   console.log(`Server started`);
// });


// Initialize server
app.listen(5000, () => {
  console.log("Running on port 5000.");
});

app.get("/result", async (req, res) => {
  console.log("extractedData", extractedData);
  if (extractedData === undefined) {
    return;
  }
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
