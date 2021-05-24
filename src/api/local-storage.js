import uuid from "uuid/v4";

const testData = {
  books: {
    allIds: [],
    byId: {},
  },
  authors: {
    allIds: ["author-1", "author-2", "author-3", "author-4"],
    byId: {
      "author-1": {
        id: "author-1",
        firstName: "Number 1",
        lastName: "Author",
      },
      "author-2": {
        id: "author-2",
        firstName: "Number 2",
        lastName: "Author",
      },
      "author-3": {
        id: "author-3",
        firstName: "Number 3",
        lastName: "Author",
      },
      "author-4": {
        id: "author-4",
        firstName: "Number 4",
        lastName: "Author",
      },
    },
  },
  authorBook: [],
  series: {
    allIds: ["series-3", "series-1", "series-4", "series-2"],
    byId: {
      "series-1": {
        id: "series-1",
        title: "Series Number 1",
      },
      "series-2": {
        id: "series-2",
        title: "Series Number 2",
      },
      "series-3": {
        id: "series-3",
        title: "Series Number 3",
      },
      "series-4": {
        id: "series-4",
        title: "Series Number 4",
      },
    },
  },
};

for (let index = 0; index < 40; index++) {
  const book = {
    id: "book-" + (index + 1),
    title: "Book Number " + (index + 1),
    seriesId:
      testData.series.allIds[
        Math.floor(Math.random() * (testData.series.allIds.length - 1))
      ],
    bookNumber: Math.round(Math.random() * 5).toString(),
  };
  testData.books.allIds.push(book.id);
  testData.books.byId[book.id] = book;
  const numAuthors = Math.round(Math.random() * 4);
  let authors = [];
  for (let index = 0; index < numAuthors; index++) {
    authors.push(testData.authors.allIds[index]);
  }
  authors.forEach((authorId, i) => {
    testData.authorBook.push({
      id: "author-" + i + "-" + book.id,
      bookId: book.id,
      authorId: authorId,
    });
  });
}

let databaseName;
let state;

export default {
  init(dbName, callback) {
    databaseName = dbName;

    // localStorage.removeItem(databaseName);
    state = localStorage.getItem(databaseName);

    if (state === null) {
      state = {
        books: {
          allIds: [],
          byId: {},
        },
        authors: {
          allIds: [],
          byId: {},
        },
        authorBook: [],
        series: {
          allIds: [],
          byId: {},
        },
        seriesBook: [],
      };
    } else {
      state = JSON.parse(state);
    }

    updateStorage(state);

    const response = {
      data: state,
      status: 1,
    };

    if (callback) {
      callback(response);
    }
  },
  getAllData(callback) {
    const response = {
      data: state,
      status: 1,
    };

    if (callback) {
      callback(response);
    }
  },
  addBook(data, callback) {
    let book = {
      id: data.id ? data.id : uuid(),
      title: data.title,
      seriesId: data.seriesId,
      bookNumber: data.bookNumber,
    };
    let idx = state.books.allIds.indexOf(book.id);
    if (idx > -1) {
      state.books.allIds[idx] = book.id;
    } else {
      state.books.allIds.push(book.id);
    }
    state.books.byId[book.id] = book;

    this.linkAuthors(book.id, data.authors);

    updateStorage(state);

    const response = {
      data: state,
      status: 1,
    };

    if (callback) {
      callback(response);
    }
  },
  removeBook(id, callback) {
    // remove from order
    state.books.allIds.splice(state.books.allIds.indexOf(id), 1);
    // remove from lookup
    delete state.books.byId[id];
    // remove any links to authors
    state.authorBook = state.authorBook.filter((record) => {
      return record.bookId !== id;
    });
    updateStorage(state);

    const response = {
      data: state,
      status: 1,
    };

    if (callback) {
      callback(response);
    }
  },
  unlinkAuthors(bookId) {
    state.authorBook = state.authorBook.filter((record) => {
      return record.bookId !== bookId;
    });
  },
  linkAuthors(bookId, authors) {
    // remove existing links first
    this.unlinkAuthors(bookId);
    authors.forEach((authorId) => {
      state.authorBook.push({
        id: uuid(),
        bookId,
        authorId,
      });
    });
  },
  addAuthor(data, callback) {
    let author = createAuthor(data);
    let idx = state.authors.allIds.indexOf(author.id);
    if (idx > -1) {
      state.authors.allIds[idx] = author.id;
    } else {
      state.authors.allIds.push(author.id);
    }
    state.authors.byId[author.id] = author;

    updateStorage(state);

    const response = {
      data: state,
      status: 1,
    };

    if (callback) {
      callback(response);
    }
  },
  removeAuthor(id, callback) {
    // remove from order
    state.authors.allIds.splice(state.authors.allIds.indexOf(id), 1);
    // remove from lookup
    delete state.authors.byId[id];
    // remove any links to books
    state.authorBook = state.authorBook.filter((record) => {
      return record.authorId !== id;
    });
    updateStorage(state);

    const response = {
      data: state,
      status: 1,
    };

    if (callback) {
      callback(response);
    }
  },
  addSeries(data, callback) {
    let series = createSeries(data);
    let idx = state.series.allIds.indexOf(series.id);
    if (idx > -1) {
      state.series.allIds[idx] = series.id;
    } else {
      state.series.allIds.push(series.id);
    }
    state.series.byId[series.id] = series;

    updateStorage(state);

    const response = {
      data: state,
      status: 1,
    };

    if (callback) {
      callback(response);
    }
  },
  removeSeries(id, callback) {
    // remove from order
    state.series.allIds.splice(state.series.allIds.indexOf(id), 1);
    // remove from lookup
    delete state.series.byId[id];

    updateStorage(state);

    const response = {
      data: state,
      status: 1,
    };

    if (callback) {
      callback(response);
    }
  },
};

const updateStorage = (state) => {
  localStorage.setItem(databaseName, JSON.stringify(state));
};

const createAuthor = (data) => {
  let author = {
    id: data.id ? data.id : uuid(),
  };
  if (data.firstName) {
    author.firstName = data.firstName;
  }
  if (data.lastName) {
    author.lastName = data.lastName;
  }
  return author;
};

const createSeries = (data) => {
  let series = {
    id: data.id ? data.id : uuid(),
  };
  if (data.title) {
    series.title = data.title;
  }
  return series;
};
