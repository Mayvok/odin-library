let userLibrary = [];

let parentContainer = document.getElementById("books");
let form = document.getElementById("create-book");

form.addEventListener("submit", formSubmit);

// Transform string to title-case
String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

// Book object
function Book(title, author, pages, hasRead) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.hasRead = hasRead);
  this.id = Math.floor(Math.random() * 1000000).toString();
}

// Adds a new book object to library array
function addBookToLibrary(title, author, pages, hasRead) {
  let newBook = new Book();
  newBook.title = title;
  newBook.author = author;
  newBook.pages = pages;
  newBook.hasRead = hasRead;

  userLibrary.push(newBook);
}

// Populate table with examples to begin with
addBookToLibrary("The Lord of the Rings", "J. R. R. Tolkien", 1137, false);
addBookToLibrary("The Stand", "Stephen King", 1153, true);
addBookToLibrary("East of Eden", "John Steinbeck", 608, true);

// Creates the table layout by first removing any current book nodes, iterating through the library array, and assigning a row for each book found
function createTableLayout() {
  parentContainer.replaceChildren();

  if (userLibrary.length === 0) {
    let dummyRow = document.createElement("tr");
    dummyRow.insertCell();
    dummyRow.insertCell();
    dummyRow.insertCell();
    dummyRow.insertCell();
    parentContainer.appendChild(dummyRow);
  }

  userLibrary.forEach((book) => {
    createBookElement(book);
  });
  getButtonList();
}

function createBookElement(book) {
  /////////////// Table ///////////////////////////////////
  let bookContainer = document.createElement("tr");
  let bookTitle = document.createElement("td");
  let bookAuthor = document.createElement("td");
  let bookPages = document.createElement("td");

  bookContainer.className = "book-table-entry";
  bookTitle.className = "title";
  bookAuthor.className = "author";
  bookPages.className = "pages";

  ////////////   Buttons  ////////////////////////////////
  let utilButtons = document.createElement("td");
  let hasReadButton = document.createElement("button");
  let deleteButton = document.createElement("button");

  hasReadButton.id = "read";
  deleteButton.id = "delete";
  utilButtons.className = "updateButtons";
  hasReadButton.className = "read";
  deleteButton.className = "delete";

  hasReadButton.innerText = "Read";
  deleteButton.innerText = "Delete";

  if (book.hasRead) {
    hasReadButton.classList.add("active");
  }

  bookContainer.id = book.id;
  bookTitle.innerText = book.title.toProperCase();
  bookAuthor.innerText = book.author.toProperCase();
  bookPages.innerText = book.pages.toString();
  bookHasRead = book.hasRead;
  utilButtons.appendChild(hasReadButton);
  utilButtons.appendChild(deleteButton);

  parentContainer.appendChild(bookContainer);
  bookContainer.appendChild(bookTitle);
  bookContainer.appendChild(bookAuthor);
  bookContainer.appendChild(bookPages);
  bookContainer.appendChild(utilButtons);
}

// Remaps buttons after refreshing table layout
function getButtonList() {
  const buttonListDel = document.querySelectorAll(".delete");
  const buttonListRead = document.querySelectorAll("#read");
  buttonListDel.forEach((button) => {
    button.addEventListener("click", deleteBook);
  });
  buttonListRead.forEach((button) => {
    button.addEventListener("click", switchReadStatus);
  });
}

// Grabs parent book container index of userLibrary and changes read value to true/false
function switchReadStatus() {
  let parentNode = this.parentNode;
  let parentContainerId = parentNode.parentNode.id;
  let index = userLibrary.findIndex((book) => book.id === parentContainerId);

  userLibrary[index].hasRead = !userLibrary[index].hasRead;
  createTableLayout();
}

// Grabs parent book container ID, which is the same as current selected book ID, and removes it from the library array.
function deleteBook() {
  let parentNode = this.parentNode;
  let parentContainerId = parentNode.parentNode.id;
  let index = userLibrary.findIndex((book) => book.id === parentContainerId);

  userLibrary.splice(index, 1);
  createTableLayout();
}

// Captures input values and passes them to be added to the library and added into the table
function formSubmit(e) {
  e.preventDefault();
  let bookTitle = document.getElementById("newTitle").value;
  let bookAuthor = document.getElementById("newAuthor").value;
  let bookPages = document.getElementById("newPages").value;
  let hasRead = document.getElementById("userHasRead").checked;

  if (
    userLibrary.find(
      (book) => book.title.toProperCase() === bookTitle.toProperCase()
    )
  ) {
    alert("Book with that title already found!");
    clearForm();
    return;
  }

  addBookToLibrary(bookTitle, bookAuthor, bookPages, hasRead);
  createTableLayout();
  clearForm();
}

// Clears the input fields
function clearForm() {
  document.getElementById("newTitle").value = "";
  document.getElementById("newAuthor").value = "";
  document.getElementById("newPages").value = "";
}

window.onload = () => {
  clearForm();
  createTableLayout();
};
