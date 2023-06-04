function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}
//  usage of the helper function in another function
function getBooksWithAuthorInfo(account, books, authors) {
  const booksWithAuthorInfo = [];
  for (const borrow of account.borrows) {
    const book = books.find((book) => book.id === borrow.id);
    const author = findAuthorById(authors, book.authorId);
    const bookWithAuthorInfo = { ...book, author };
    booksWithAuthorInfo.push(bookWithAuthorInfo);
  }
  return booksWithAuthorInfo;
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const borrowed = books.filter((book) => book.borrows[0].returned === false);
  const returned = books.filter((book) => book.borrows[0].returned === true);
  return [borrowed, returned];
}

function getBorrowersForBook(book, accounts) {
  const { borrows } = book;
  const result = [];

  for (let i = 0; i < borrows.length; i++) {
    const borrow = borrows[i];
    const account = accounts.find((acc) => acc.id === borrow.id);
    const { returned } = borrow;
    result.push({ ...account, returned });
  }

  return result.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
