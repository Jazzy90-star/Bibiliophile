let mock_api_Url = "https://65ea1078c9bf92ae3d3b01e9";
let mock_api = ".mockapi.io/project";
let resource_name = "/booklist";

//this section adds an event listener on a click to the submit button
var selectedRow = null;

// Function to fetch and display books from the mock API
async function displayBooks() {
  const response = await fetch(mock_api_Url + mock_api + resource_name);
  const books = await response.json();
  books.forEach((book) => {
    insertNewLine(book);
  });
}

// Call the displayBooks function when the page loads
document.addEventListener("DOMContentLoaded", displayBooks);

let addButton = document.getElementById("create-new-collection");
addButton.addEventListener("click", function (e) {
  e.preventDefault();
  onCollectionSubmit();
  resetForm();
  console.log("add button clicked");

  $.ajax({
    type: "POST",
    url: mock_api_Url + mock_api + resource_name,
    contentType: "application/json",
    data: JSON.stringify(readFormData()),
  });
});

function onCollectionSubmit() {
  var formData = readFormData();
  if (selectedRow == null) {
    insertNewLine(formData);
  } else {
    updateRow(formData);
  }
  resetForm();
}
//This defines what newBook is so i can use it in other parts of my code
function readFormData() {
  let newBook = {
    bookTitle: document.getElementById("title-input").value,
    author: document.getElementById("author-input").value,
    isbn: document.getElementById("book-ISBN").value,
    bookFormat: document.getElementById("book-format").value,
    bookNotes: document.getElementById("book-notes").value,
    rating: document.getElementById("rating").value,
  };
  return newBook;
}
//This code inserts new cells into the table when the submit button is clicked
function insertNewLine(newBook) {
  var myListTable = document
    .getElementById("myListTable")
    .getElementsByTagName("tbody")[0];
  var newRow = myListTable.insertRow();

  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);
  var cell5 = newRow.insertCell(4);
  var cell6 = newRow.insertCell(5);
  var cell7 = newRow.insertCell(6);

  cell1.innerHTML = newBook.bookTitle;
  cell2.innerHTML = newBook.author;
  cell3.innerHTML = newBook.isbn;
  cell4.innerHTML = newBook.bookFormat;
  cell5.innerHTML = newBook.bookNotes;
  cell6.innerHTML = newBook.rating;

  // Create delete button code with event listener
  var deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("btn", "btn-danger");
  deleteButton.addEventListener("click", function () {
    var row = this.parentNode.parentNode;
    row.parentNode.removeChild(row);
  });

  cell7.appendChild(deleteButton);

  //edit button code and creating an edit button. Also allows changes to go back to the table updated with the current information
  var editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.classList.add("btn", "btn-primary");
  editButton.addEventListener("click", function () {
    edit(newRow);
  });
  cell7.appendChild(editButton);
}
function edit(row) {
  selectedRow = row;
  document.getElementById("title-input").value = row.cells[0].innerHTML;
  document.getElementById("author-input").value = row.cells[1].innerHTML;
  document.getElementById("book-ISBN").value = row.cells[2].innerHTML;
  document.getElementById("book-format").value = row.cells[3].innerHTML;
  document.getElementById("book-notes").value = row.cells[4].innerHTML;
  document.querySelector('input[name="rating"]').value = row.cells[5].innerHTML;
}

function updateRow(formData) {
  selectedRow.cells[0].innerHTML = formData.bookTitle;
  selectedRow.cells[1].innerHTML = formData.author;
  selectedRow.cells[2].innerHTML = formData.isbn;
  selectedRow.cells[3].innerHTML = formData.bookFormat;
  selectedRow.cells[4].innerHTML = formData.bookNotes;
  selectedRow.cells[5].innerHTML = formData.rating;
}

//This code resets the form back to blank after the submit button is clicked so things can be typed in again
function resetForm() {
  document.getElementById("title-input").value = "";
  document.getElementById("author-input").value = "";
  document.getElementById("book-ISBN").value = "";
  document.getElementById("book-format").value = "";
  document.getElementById("book-notes").value = "";
  document.querySelector('input[name="rating"]').value = "";
  selectedRow = null;
}
