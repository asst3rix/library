const myLibrary = [];
const booksList = document.querySelector("#books-list");
const dialog = document.querySelector("dialog");
const addButton = document.querySelector("#add-button");
const closeButton = document.querySelector("#close");

addButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

addBookToLibrary("The Fellowship of the Ring", "J.R.R Tolkien", "423", "Yes");
addBookToLibrary("The Two Towers", "J.R.R Tolkien", "352", "Yes");
addBookToLibrary("The Return of the King", "J.R.R Tolkien", "416", "Yes");
addBookToLibrary("Vingt mille lieues sous les mers", "Jules Verne", "526", "No");

displayBooks();

// Book constructor.
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;

    if (isRead === "Yes") {
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