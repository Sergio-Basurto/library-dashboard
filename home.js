function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const borrowed = books.filter((book) => book.borrows[0].returned === false);
  return borrowed.length;
}

function getMostCommonGenres(books) {
  const genreCounts = books.reduce((counts, { genre }) => {
    counts[genre] = (counts[genre] || 0) + 1;
    return counts;
  }, {});

  return Object.entries(genreCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getMostPopularBooks(books) {
  const sortedBooks = books.sort(
    (bookA, bookB) => bookB.borrows.length - bookA.borrows.length
  );
  const topBooks = sortedBooks.slice(0, 5).map((book) => ({
    name: book.title,
    count: book.borrows.length,
  }));

  return topBooks;
}

function getMostPopularAuthors(books, authors) {
  const authorBorrowCounts = {};

  books.forEach(({ authorId, borrows }) => {
    const {
      name: { first, last },
    } = authors.find(({ id }) => id === authorId);
    const authorName = `${first} ${last}`;
    authorBorrowCounts[authorName] = authorBorrowCounts[authorName]
      ? authorBorrowCounts[authorName] + borrows.length
      : borrows.length;
  });

  return Object.entries(authorBorrowCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
