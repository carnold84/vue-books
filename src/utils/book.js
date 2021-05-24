export const getAuthors = (book, authors, authorBook) => {
  const authorIds = [];
  authorBook.forEach(function(record) {
    if (record.book === book.id) {
      authorIds.push(record.author);
    }
  });
  const bookAuthors = authors.filter(function(author) {
    return authorIds.includes(author.id);
  });

  let authorObjects;
  if (bookAuthors.length > 0) {
    authorObjects = [];
    bookAuthors.forEach(function(author) {
      authorObjects.push({
        id: author.id,
        firstName: author.firstName,
        lastName: author.lastName,
        url: `/author/${author.id}`,
      });
    });
  }
  return authorObjects;
};

export const getSeries = (book, series, seriesBook) => {
  let bookSeriesId;
  let bookSeries;
  seriesBook.forEach(function(record) {
    if (record.book === book.id) {
      bookSeriesId = record.series;
    }
  });

  bookSeries = series.filter(function(element) {
    return element.id === bookSeriesId;
  });
  bookSeries = bookSeries ? bookSeries[0] : undefined;

  if (bookSeries) {
    return {
      id: bookSeries.id,
      title: bookSeries.title,
      url: `/series/${bookSeries.id}`,
    };
  }

  return undefined;
};
