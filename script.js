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

        const bookTitle = createTag("h2", "", myLibrary[index].title)
        bookCard.appendChild(bookTitle);

        const bookAuthor = createTag("p", "", myLibrary[index].author)
        bookCard.appendChild(bookAuthor);

        const bookPages = createTag("p", "", myLibrary[index].pages + " pages")
        bookCard.appendChild(bookPages);

        const bookRead = createTag("div", "book-read", "");
        bookCard.appendChild(bookRead);

        const isRead = createTag("p", "", "Is read?")
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