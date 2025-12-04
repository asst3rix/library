const myLibrary = [];
const booksList = document.querySelector("#books-list");
const dialog = document.querySelector("dialog");
const addButton = document.querySelector("#add-button");
const closeButton = document.querySelector("#close");
const validationButton = document.querySelector("#validation-button");
const titleInput = document.querySelector("#book-title");
const authorInput = document.querySelector("#book-author");
const pagesInput = document.querySelector("#book-pages");

addBookToLibrary("The Fellowship of the Ring", "J.R.R Tolkien", "423", "1");
addBookToLibrary("The Two Towers", "J.R.R Tolkien", "352", "1");
addBookToLibrary("The Return of the King", "J.R.R Tolkien", "416", "1");
addBookToLibrary("Vingt mille lieues sous les mers", "Jules Verne", "526", "0");

displayBooks();

addButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

validationButton.addEventListener("click", (event) => {
    event.preventDefault();

    // We do it now because when loading the page, there is no radio button checked so this return 'null'.
    const selector = 'input[name="isread"]:checked';
    const isReadInput = document.querySelector(selector);

    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, isReadInput.value);

    // Reset the form.
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    isReadInput.checked = false;

    dialog.close();
    displayBooks();
});

// Book constructor.
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;

    if (isRead === "1") {
        this.isRead = true;
    } else {
        this.isRead = false;
    }

    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
}

function displayBooks() {
    // Delete everything that could be here before starting showing the books.
    booksList.innerHTML = '';

    for (let index = 0; index < myLibrary.length; index++) {
        const bookCard = createTag("div", "book-card", "");
        booksList.appendChild(bookCard);

        const bookDiv = createTag("div", "", "");
        const bookTitle = createTag("h2", "", myLibrary[index].title);
        bookDiv.appendChild(bookTitle);

        const bookAuthor = createTag("p", "", myLibrary[index].author);
        bookDiv.appendChild(bookAuthor);

        const bookPages = createTag("p", "", myLibrary[index].pages + " pages");
        bookDiv.appendChild(bookPages);

        const bookRead = createTag("div", "book-read", "");
        bookDiv.appendChild(bookRead);

        const isRead = createTag("p", "", "Is read?");
        bookRead.appendChild(isRead);

        const readButton = createTag("button", "is-read-button", "");

        if (myLibrary[index].isRead) {
            readButton.classList.add("read");
            readButton.textContent = "Yes";
        } else {
            readButton.classList.add("not-read");
            readButton.textContent = "No";
        }

        bookRead.appendChild(readButton);

        bookCard.appendChild(bookDiv);
        bookCard.appendChild(createSVG());
    }
}

// Function that create an HTML element giving a type, class and text.
function createTag(type, classs, text) {
    const tag = document.createElement(type);
    if (classs != "") {
        tag.classList.add(classs);
    }
    if (text != "") {
        tag.textContent = text;
    }
    return tag;
}

function createSVG() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svgDelete = document.createElementNS(svgNS, "svg");
    svgDelete.classList.add("delete-book");
    svgDelete.setAttribute("xmlns", svgNS);
    svgDelete.setAttribute("viewBox", "0 0 24 24");
    const titleElement = document.createElementNS(svgNS, "title");
    titleElement.textContent = "delete";
    svgDelete.appendChild(titleElement);
    const pathElement = document.createElementNS(svgNS, "path");
    pathElement.setAttribute("d", "M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z");
    svgDelete.appendChild(pathElement);
    return svgDelete;
}