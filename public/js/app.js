//selecting all required elements
flag = false;
const dropArea = document.querySelector(".modal-content"),
  dragText = dropArea.querySelector("header"),
  button = dropArea.querySelector(".browse"),
  input = dropArea.querySelector("input");
// Selecting all required elements
// var flag = false;
// var url_flag = false;
// var dragTextHeading = document.getElementById("drag-text-heading");
// var dragTextInfo = document.getElementById("drag-text-info");
// var inputElement = document.getElementById("input-url");
// var imgElement = document.querySelector(".show-img-preview");
// var dropArea = document.querySelector(".modal-content");
var labelText = null;
let inputElement = document.getElementById("input-url");
var previousFile; // To store the previously selected file

let file; //this is a global variable and we'll use it inside multiple functions
let img_url = null;
button.onclick = () => {
  input.click();
};

input.addEventListener("change", function () {
  if (!this.files[0] && previousFile) {
    flag = false; // Use the previousFile if no new file is selected
    file = previousFile;
    console.log("its close");
    // Create new elements with unique id attributes
    const newDragTextHeading = document.createElement("h2");
    newDragTextHeading.textContent = "Drag and drop your files here";
    newDragTextHeading.id = "drag-text-heading"; // Assign a unique id

    const newDragTextInfo = document.createElement("p");
    newDragTextInfo.textContent =
      "Supported Formats: PDF, Doc, Image Size: up to 10MB";
    newDragTextInfo.id = "drag-text-info"; // Assign a unique id

    const imgElement = document.querySelector(".show-img-preview");
    imgElement.src = "";
    imgElement.src = "./images/documents.png";
    // Remove the duplicated id attributes from the <h2> and <p> elements
    const dragTextHeading = document.getElementById("drag-text-heading");
    const dragTextInfo = document.getElementById("drag-text-info");
    // Replace the removed elements with the new elements
    dragTextHeading.replaceWith(newDragTextHeading);
    dragTextInfo.replaceWith(newDragTextInfo);
  } else {
    // console.log("img-upload");
    file = this.files[0];
    if (file) {
      console.log("cdhshshdd");

      // Update the previousFile if a new file is selected
      previousFile = file;
    }

    console.log("previousFile", previousFile);

    if (file) {
      console.log("file inside chnage", file);

      console.log("cddd");
      // Process the file upload here
      flag = true;
      dropArea.classList.add("active");
      showFile();
    }
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

    dragTextHeading.innerHTML = "";
    dragTextInfo.innerHTML = "";
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

        dragTextHeading.innerHTML = "";
        dragTextInfo.innerHTML = "";
      };

      fileReader.readAsDataURL(file);
    } else {
      const snackbar = document.getElementById("snackbar");
      snackbar.textContent =
        "This is not an Image File! please choose a valid image only";
      snackbar.className = "show";
      flag = false;
      dropArea.classList.remove("active");
      // dragText.textContent = "Drag & Drop to Upload ";
    }
  }
}
console.log("file-img", file);
function loader() {
  event.preventDefault();
  console.log("labelText", labelText);

  // const selectedRadio = document.querySelector(
  //   'input[name="document"]:checked'
  // );

  // // const dropArea = document.querySelector(".modal-content");
  // const imageInput = document.querySelector('input[name="image"]');
  // const flag = imageInput.files.length > 0;
  const url_flag = img_url !== null;

  // alert(selectedRadio.innerHTML);
  if (flag !== false && labelText) {
    console.log("flag", flag);
    console.log("url_flag", url_flag);
    // Get the value of the selected radio button
    const selectedApi = labelText;
    console.log("selectedApi", selectedApi);
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
    console.log("flag", flag);
    console.log("url_flag", url_flag);

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

  // imgElement.src = img_url;
}

// Close the popup modal
function closePopup() {
  console.log("flag in poppclose", flag);

  flag = false;
  url_flag = false;
  file = null;
  img_url = null;
  console.log("closePopup clicked");
  console.log("flag in poppclose", flag);

  // Remove the duplicated id attributes from the <h2> and <p> elements
  const dragTextHeading = document.getElementById("drag-text-heading");
  const dragTextInfo = document.getElementById("drag-text-info");

  console.log("dragTextHeading", dragTextHeading);
  console.log("dragTextInfo", dragTextInfo);

  //  dragTextHeading.remove();
  //  dragTextInfo.remove();

  // Hide the modal
  const modal = document.getElementById("popupModal");
  modal.style.display = "none";

  const imgElement = document.querySelector(".show-img-preview");
  imgElement.src = "./images/documents.png";

  if (dragTextHeading && dragTextInfo) {
    // Create new elements with unique id attributes
    const newDragTextHeading = document.createElement("h2");
    newDragTextHeading.textContent = "Drag and drop your files here";
    newDragTextHeading.id = "drag-text-heading"; // Assign a unique id

    const newDragTextInfo = document.createElement("p");
    newDragTextInfo.textContent =
      "Supported Formats: PDF, Doc, Image Size: up to 10MB";
    newDragTextInfo.id = "drag-text-info"; // Assign a unique id

    // Replace the removed elements with the new elements
    dragTextHeading.replaceWith(newDragTextHeading);
    dragTextInfo.replaceWith(newDragTextInfo);
  }
}
// Attach the openPopup function to the button's click event
const openBtn = document.getElementById("openPopupBtn");
// openBtn.addEventListener("click", openPopup);

// Attach the closePopup function to the close button's click event
const closeBtn = document.getElementById("closePopupBtn");
closeBtn.addEventListener("click", closePopup);
