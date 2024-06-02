let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function toggleRead(e) {
    let index = e.currentTarget.dataset.index;
    myLibrary[index].toggleRead();
}

function addToLibrary() {
    let isRead = inputRead.checked;
    let book = new Book(inputTextList[0].value, inputTextList[1].value, inputTextList[2].value, isRead)
    myLibrary.push(book);
}

function deleteBook(e) {
    let index = e.currentTarget.dataset.index;
    myLibrary.splice(index, 1);
    let book = document.querySelector(`div[data-index='${index}']`);
    book.parentNode.removeChild(book);
}

function displayBook() {
    let index = myLibrary.length - 1
    let newBook = myLibrary[index];
    let cardImgWrapper = document.createElement("i");
    let cardImg = document.createElement("img");
    let card = document.createElement("div");
    let delBtn = document.createElement("button");
    delBtn.textContent = "X"

    delBtn.dataset.index = index;
    delBtn.classList.add("del-btn");
    delBtn.addEventListener("click", deleteBook);
    cardImg.setAttribute("src", "./book-icon.svg");
    cardImgWrapper.appendChild(cardImg);
    card.classList.add("card");
    // used to identify book
    card.dataset.index = index;
    card.appendChild(delBtn);
    card.appendChild(cardImgWrapper);

    for (property in newBook) {
        let div = document.createElement("div");
        let para = document.createElement("p");

        switch(property) {
            case "title":
                para.textContent = `"${newBook[property]}"`;
                div.appendChild(para);
                break;
            case "author":
                para.textContent = `by ${newBook[property]}`;
                div.appendChild(para);
                break;
            case "pages":
                para.textContent = `pages: ${newBook[property]}`;
                div.appendChild(para);
                break;
            case "read":
                div.classList.add("read-container");
                para.textContent = "Read: "
                let label = document.createElement("label");
                let input = document.createElement("input");
                let span = document.createElement("span");

                if (newBook[property] === true) input.checked = true;
                div.classList.add("read-container")
                label.classList.add("read-switch");
                input.setAttribute("type", "checkbox");
                input.addEventListener("click", toggleRead);
                input.dataset.index = index;
                span.classList.add("slider");
                label.appendChild(input);
                label.appendChild(span)
                div.appendChild(para);
                div.appendChild(label);
                break;
        }
        card.appendChild(div);
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
    inputRead.checked = false;
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