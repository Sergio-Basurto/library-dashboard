function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
    accountA.name.last.toLowerCase() < accountB.name.last.toLowerCase() ? -1 : 1
  );
}

function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  return books.reduce((acc, book) => {
    const borrowCount = book.borrows.filter(
      (borrow) => borrow.id === accountId
    ).length;
    return acc + borrowCount;
  }, 0);
}
function getBooksPossessedByAccount(account, books, authors) {
  const { id: accountId } = account;

  return books
    .filter((book) =>
      book.borrows.some((borrow) => borrow.id === accountId && !borrow.returned)
    )
    .map((book) => ({
      ...book,
      author: authors.find((author) => author.id === book.authorId),
    }));
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
