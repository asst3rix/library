const myLibrary = [];

// Book constructor
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
}

addBookToLibrary("The Fellowship of the Ring", "J.R.R Tolkien", "423", "Yes");
addBookToLibrary("The Two Towers", "J.R.R Tolkien", "352", "Yes");
addBookToLibrary("The Return of the King", "J.R.R Tolkien", "416", "Yes");