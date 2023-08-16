//selecting all required elements
var flag = false;
const dropArea = document.querySelector(".modal-content"),
  dragText = dropArea.querySelector("header"),
  button = dropArea.querySelector(".browse"),
  input = dropArea.querySelector("input");
let inputElement = document.getElementById("input-url");

let file; //this is a global variable and we'll use it inside multiple functions
let img_url = null;
button.onclick = () => {
  input.click();
};

input.addEventListener("change", function () {
  console.log("img-upload");
  file = this.files[0];
  if (file) {
    // Process the file upload here
    flag = true;
    dropArea.classList.add("active");
    showFile();
    console.log("file", file);
  }
});

inputElement.addEventListener("input", function () {
  img_url = inputElement.value; // Store the URL string
  console.log("img_url - ", img_url);

  if (img_url) {
    flag = true;
    // Process the URL input here
    dropArea.classList.add("active");
    showFile();
  }
});

/*
//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  //dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  //dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event) => {
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = event.dataTransfer.files[0];
  console.log(file.webkitRelativePath);
  if (file) {
    flag = true;
    document.querySelector(".file").nodeValue = file;
  }
  showFile(); //calling function
});
*/

function showFile() {
  if (img_url !== null) {
    console.log("img-url");
    flag = true;
    const imgElement = document.querySelector(".show-img-preview");
    // Remove the id attribute from the element
    imgElement.removeAttribute("id");

    imgElement.src = img_url;

    // Remove the duplicated id attributes from the <h2> and <p> elements
    const dragTextHeading = document.getElementById("drag-text-heading");
    const dragTextInfo = document.getElementById("drag-text-info");

    dragTextHeading.remove();
    dragTextInfo.remove();
    console.log("img url in show file", img_url);
  } else {
    let fileType = file.type; //getting selected file type
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
    if (validExtensions.includes(fileType)) {
      //if user selected file is an image file
      let fileReader = new FileReader(); //creating new FileReader object
      fileReader.onload = () => {
        let fileURL = fileReader.result; //passing user file source in fileURL variable
        const imgElement = document.querySelector(".show-img-preview");

        // Remove the id attribute from the element
        imgElement.removeAttribute("id");

        imgElement.src = fileURL;

        // Remove the duplicated id attributes from the <h2> and <p> elements
        const dragTextHeading = document.getElementById("drag-text-heading");
        const dragTextInfo = document.getElementById("drag-text-info");

        dragTextHeading.remove();
        dragTextInfo.remove();
      };

      fileReader.readAsDataURL(file);
    } else {
      // alert("This is not an Image File!");

      const snackbar = document.getElementById("snackbar");
      snackbar.textContent =
        "This is not an Image File! please choose a valid image only";
      snackbar.className = "show";

      dropArea.classList.remove("active");
      dragText.textContent = "Drag & Drop to Upload File";
    }
  }
}

function loader() {
  event.preventDefault();
  console.log("labelText", labelText);

  const selectedRadio = document.querySelector(
    'input[name="document"]:checked'
  );

  // const dropArea = document.querySelector(".modal-content");
  const imageInput = document.querySelector('input[name="image"]');
  const flag = imageInput.files.length > 0;
  const url_flag = img_url !== null;

  // alert(selectedRadio.innerHTML);
  if (flag || (url_flag && labelText)) {
    // Get the value of the selected radio button
    const selectedApi = labelText;
    // Send the selected API value as a hidden input field in the form
    const selectedApiInput = document.createElement("input");
    selectedApiInput.type = "hidden";
    selectedApiInput.name = "selectedApi";
    selectedApiInput.value = selectedApi;
    document.querySelector("form").appendChild(selectedApiInput);

    // return;
    document.querySelector("form").submit();

    document.getElementById("spinner-body").style.display = "flex";
    // const spinner = document.createElement("img");
    // spinner.src = "images/Spinner.svg";
    // spinner.classList.add("spinner");
    // dropArea.appendChild(spinner);
  } else if (!flag || !url_flag) {
    // Handle image not uploaded scenario
    console.log("Please upload an image");

    const snackbar = document.getElementById("snackbar");
    snackbar.textContent = "Please upload an image before proceeding.";
    snackbar.className = "show";

    setTimeout(function () {
      snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
  } else {
    // Handle radio button not selected scenario
    console.log("Please select a document type");

    const snackbar = document.getElementById("snackbar");
    snackbar.textContent = "Please select a document type before uploading.";
    snackbar.className = "show";

    setTimeout(function () {
      snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
  }
}

// var buttons = document.getElementsByTagName("button");

// Array.prototype.forEach.call(buttons, function (b) {
//   b.addEventListener("click", createRipple);
// });

// function createRipple(e) {
//   if (this.getElementsByClassName("ripple").length > 0) {
//     this.removeChild(this.childNodes[1]);
//   }

//   var circle = document.createElement("div");
//   this.appendChild(circle);

//   var d = Math.max(this.clientWidth, this.clientHeight);
//   circle.style.width = circle.style.height = d + "px";

//   circle.style.left = e.clientX - this.offsetLeft - d / 2 + "px";
//   circle.style.top = e.clientY - this.offsetTop - d / 2 + "px";
//   //console.log("enter");
//   circle.classList.add("ripple");
// }

// smoothe scrool to pasrtcular div

function scrollToDiv(divId) {
  var selectedDiv = document.getElementById(divId);
  if (selectedDiv) {
    selectedDiv.scrollIntoView({ behavior: "smooth" });
  }
}

// javascript for popup modal only
function openPopup() {
  const modal = document.getElementById("popupModal");
  modal.style.display = "block";
}

function closePopup() {
  const modal = document.getElementById("popupModal");
  modal.style.display = "none";
}

// Attach the openPopup function to the button's click event
const openBtn = document.getElementById("openPopupBtn");
// openBtn.addEventListener("click", openPopup);

// Attach the closePopup function to the close button's click event
const closeBtn = document.getElementById("closePopupBtn");
closeBtn.addEventListener("click", closePopup);

// Attach the closePopup function to the window's click event
window.addEventListener("click", (event) => {
  const modal = document.getElementById("popupModal");
  if (event.target == modal) {
    closePopup();
  }
});
