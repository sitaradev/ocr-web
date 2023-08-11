//selecting all required elements
var flag = false;
const dropArea = document.querySelector(".drag-area"),
  dragText = dropArea.querySelector("header"),
  button = dropArea.querySelector(".browse"),
  input = dropArea.querySelector("input");

let file; //this is a global variable and we'll use it inside multiple functions

button.onclick = () => {
  input.click(); //if user click on the button then the input also clicked
};

input.addEventListener("change", function () {
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  if (file) {
    flag = true;
  }
  dropArea.classList.add("active");
  showFile(); //calling function
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
  let fileType = file.type; //getting selected file type
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
  if (validExtensions.includes(fileType)) {
    //if user selected file is an image file
    let fileReader = new FileReader(); //creating new FileReader object
    fileReader.onload = () => {
      let fileURL = fileReader.result; //passing user file source in fileURL variable
      // UNCOMMENT THIS BELOW LINE. I GOT AN ERROR WHILE UPLOADING THIS POST SO I COMMENTED IT
      document.querySelector(".top").innerHTML = ""; //creating an img tag and passing user selected file source inside src attribute
      const img = document.createElement("img");
      img.src = fileURL;
      img.classList.add("image");
      dropArea.appendChild(img); //adding that created img tag inside dropArea container
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

function loader() {
  event.preventDefault();

  const selectedRadio = document.querySelector(
    'input[name="document"]:checked'
  );

  const dropArea = document.querySelector(".drag-area");
  const imageInput = document.querySelector('input[name="image"]');
  const flag = imageInput.files.length > 0;

  // alert(selectedRadio.innerHTML);
  if (flag && selectedRadio) {
    // Get the value of the selected radio button
    const selectedApi = selectedRadio.value;
    // Send the selected API value as a hidden input field in the form
    const selectedApiInput = document.createElement("input");
    selectedApiInput.type = "hidden";
    selectedApiInput.name = "selectedApi";
    selectedApiInput.value = selectedApi;
    document.querySelector("form").appendChild(selectedApiInput);

    // return;
    document.querySelector("form").submit();

    const spinner = document.createElement("img");
    spinner.src = "images/Spinner.svg";
    spinner.classList.add("spinner");
    dropArea.appendChild(spinner);
  } else if (!flag) {
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

var buttons = document.getElementsByTagName("button");

Array.prototype.forEach.call(buttons, function (b) {
  b.addEventListener("click", createRipple);
});

function createRipple(e) {
  if (this.getElementsByClassName("ripple").length > 0) {
    this.removeChild(this.childNodes[1]);
  }

  var circle = document.createElement("div");
  this.appendChild(circle);

  var d = Math.max(this.clientWidth, this.clientHeight);
  circle.style.width = circle.style.height = d + "px";

  circle.style.left = e.clientX - this.offsetLeft - d / 2 + "px";
  circle.style.top = e.clientY - this.offsetTop - d / 2 + "px";
  //console.log("enter");
  circle.classList.add("ripple");
}
