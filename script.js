let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addToLibrary() {
    let isRead = inputRead.checked;
    let book = new Book(inputTextList[0].value, inputTextList[1].value, inputTextList[2].value, isRead)
    myLibrary.push(book);
}

function displayBook() {
    let card = document.createElement("div");
    let newBook = myLibrary[myLibrary.length - 1];
    for (property in newBook) {
        let line = document.createElement("div");
        line.textContent = `${property}: ${newBook[property]}`;
        card.appendChild(line);
    }

    library.appendChild(card);
}

function displayError() {
    inputTextList.forEach((input, index) => {
        if (input.validity.valueMissing) errorTextList[index].textContent = "*This field is required";
        else if (input.validity.patternMismatch) errorTextList[index].textContent = "*Invalid input";
        else errorTextList[index].textContent = "";
    });
}

function clearForm() {
    inputTextList.forEach(inputText => inputText.value = "");
    errorTextList.forEach(errorText => errorText.textContent = "");
}

let addBookButton = document.querySelector("#add-book-button");
let dialog = document.querySelector("dialog");
let form = document.querySelector("form");
let inputTextList = document.querySelectorAll("input[type='text']");
let errorTextList = document.querySelectorAll(".error-message")
let inputRead = document.querySelector("#read");
let formSubmitButton = document.querySelector("#form-submit");
let formCancelButton = document.querySelector("#form-cancel");
let library = document.querySelector("#library");

addBookButton.addEventListener("click", () => dialog.showModal());
formCancelButton.addEventListener("click", () => dialog.close());
formSubmitButton.addEventListener("click", (e) => {
    if (form.checkValidity()) {
        addToLibrary();
        displayBook()
        clearForm();
        dialog.close();
    } else {
        displayError();
    }

    e.preventDefault();
});