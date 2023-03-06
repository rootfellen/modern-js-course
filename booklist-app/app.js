// Variables

const form = document.getElementById("book-form");
// Book constructor

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor

function UI() {}

// Add book to list
UI.prototype.addBookList = function (book) {
  const list = document.getElementById("book-list");
  // Create row element
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;
  list.appendChild(row);
};

UI.prototype.showAlert = function (message, className) {
  // Create div
  const div = document.createElement("div");
  // Add class to div
  div.className = `alert ${className}`;
  // Add text to div
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector(".container");
  // insert alert
  container.insertBefore(div, form);
  //   Timeout after 3 seconds
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// Event listeners

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form value

  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Instantiate a book
  const book = new Book(title, author, isbn);

  //Instantiate UI
  const ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // Add book to list
    ui.addBookList(book);

    // Show success
    ui.showAlert("Book Added!", "success");

    // Clear fields
    ui.clearFields();
  }
});

document.getElementById("book-list").addEventListener("click", function (e) {
  e.preventDefault();
  //Instantiate UI
  const ui = new UI();

  // Delete Book
  ui.deleteBook(e.target);

  // Show message
  ui.showAlert("Book removed!", "success");
});
