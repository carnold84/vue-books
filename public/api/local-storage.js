var VueBooksApi = function() {
  this.databaseName = undefined;
  this.state = undefined;
};

VueBooksApi.prototype.init = function(dbName, callback) {
  this.databaseName = dbName;

  // localStorage.removeItem(this.databaseName);
  this.state = localStorage.getItem(this.databaseName);

  if (this.state === null) {
    this.state = {
      books: {
        allIds: ["book-1", "book-2", "book-3", "book-4", "book-5", "book-6"],
        byId: {
          "book-1": {
            bookNumber: 1,
            id: "book-1",
            seriesId: "series-1",
            title: "Leviathan Wakes",
          },
          "book-2": {
            bookNumber: 2,
            id: "book-2",
            seriesId: "series-1",
            title: "Caliban's War",
          },
          "book-3": {
            bookNumber: 1,
            id: "book-3",
            seriesId: "series-2",
            title: "Pandora's Star",
          },
          "book-4": {
            bookNumber: 2,
            id: "book-4",
            seriesId: "series-2",
            title: "Judas Unchained",
          },
          "book-5": {
            bookNumber: 1,
            id: "book-5",
            seriesId: "series-3",
            title: "Vicious",
          },
          "book-6": {
            id: "book-6",
            title: "The Pelican Brief",
          },
        },
      },
      authors: {
        allIds: ["author-1", "author-2", "author-3", "author-4"],
        byId: {
          "author-1": {
            id: "author-1",
            firstName: "V.E.",
            lastName: "Schwab",
          },
          "author-2": {
            id: "author-2",
            firstName: "James S.A.",
            lastName: "Corey",
          },
          "author-3": {
            id: "author-3",
            firstName: "Peter F.",
            lastName: "Hamilton",
          },
          "author-4": {
            id: "author-4",
            firstName: "John",
            lastName: "Grisham",
          },
        },
      },
      authorBook: [
        {
          id: "author-book-1",
          bookId: "book-1",
          authorId: "author-2",
        },
        {
          id: "author-book-2",
          bookId: "book-2",
          authorId: "author-2",
        },
        {
          id: "author-book-3",
          bookId: "book-3",
          authorId: "author-3",
        },
        {
          id: "author-book-4",
          bookId: "book-4",
          authorId: "author-3",
        },
        {
          id: "author-book-5",
          bookId: "book-5",
          authorId: "author-1",
        },
        {
          id: "author-book-6",
          bookId: "book-6",
          authorId: "author-4",
        },
      ],
      series: {
        allIds: ["series-3", "series-1", "series-4", "series-2"],
        byId: {
          "series-1": {
            id: "series-1",
            title: "The Expanse",
          },
          "series-2": {
            id: "series-2",
            title: "Commonwealth Saga",
          },
          "series-3": {
            id: "series-3",
            title: "Villains",
          },
        },
      },
    };
  } else {
    this.state = JSON.parse(this.state);
  }

  this.updateStorage(this.state);

  var response = {
    data: this.state,
    status: 1,
  };

  if (callback) {
    callback(response);
  }
};

VueBooksApi.prototype.getAllData = function(callback) {
  var response = {
    data: this.state,
    status: 1,
  };

  if (callback) {
    callback(response);
  }
};

VueBooksApi.prototype.addBook = function(data, callback) {
  var book = {
    id: data.id ? data.id : window.uuidv4(),
    title: data.title,
    seriesId: data.seriesId,
    bookNumber: data.bookNumber,
  };
  var idx = this.state.books.allIds.indexOf(book.id);
  if (idx > -1) {
    this.state.books.allIds[idx] = book.id;
  } else {
    this.state.books.allIds.push(book.id);
  }
  this.state.books.byId[book.id] = book;

  this.linkAuthors(book.id, data.authors);

  this.updateStorage(this.state);

  var response = {
    data: this.state,
    status: 1,
  };

  if (callback) {
    callback(response);
  }
};

VueBooksApi.prototype.removeBook = function(id, callback) {
  // remove from order
  this.state.books.allIds.splice(this.state.books.allIds.indexOf(id), 1);
  // remove from lookup
  delete this.state.books.byId[id];
  // remove any links to authors
  this.state.authorBook = this.state.authorBook.filter((record) => {
    return record.bookId !== id;
  });
  this.updateStorage(this.state);

  var response = {
    data: this.state,
    status: 1,
  };

  if (callback) {
    callback(response);
  }
};

VueBooksApi.prototype.addAuthor = function(data, callback) {
  var author = this.createAuthor(data);
  var idx = this.state.authors.allIds.indexOf(author.id);
  if (idx > -1) {
    this.state.authors.allIds[idx] = author.id;
  } else {
    this.state.authors.allIds.push(author.id);
  }
  this.state.authors.byId[author.id] = author;

  this.updateStorage(this.state);

  var response = {
    data: this.state,
    status: 1,
  };

  if (callback) {
    callback(response);
  }
};

VueBooksApi.prototype.removeAuthor = function(id, callback) {
  // remove from order
  this.state.authors.allIds.splice(this.state.authors.allIds.indexOf(id), 1);
  // remove from lookup
  delete this.state.authors.byId[id];
  // remove any links to books
  this.state.authorBook = this.state.authorBook.filter((record) => {
    return record.authorId !== id;
  });
  this.updateStorage(this.state);

  var response = {
    data: this.state,
    status: 1,
  };

  if (callback) {
    callback(response);
  }
};

VueBooksApi.prototype.addSeries = function(data, callback) {
  var series = this.createSeries(data);
  var idx = this.state.series.allIds.indexOf(series.id);
  if (idx > -1) {
    this.state.series.allIds[idx] = series.id;
  } else {
    this.state.series.allIds.push(series.id);
  }
  this.state.series.byId[series.id] = series;

  this.updateStorage(this.state);

  var response = {
    data: this.state,
    status: 1,
  };

  if (callback) {
    callback(response);
  }
};

VueBooksApi.prototype.removeSeries = function(id, callback) {
  // remove from order
  this.state.series.allIds.splice(this.state.series.allIds.indexOf(id), 1);
  // remove from lookup
  delete this.state.series.byId[id];

  this.updateStorage(this.state);

  var response = {
    data: this.state,
    status: 1,
  };

  if (callback) {
    callback(response);
  }
};

VueBooksApi.prototype.updateStorage = function(state) {
  localStorage.setItem(this.databaseName, JSON.stringify(state));
};

VueBooksApi.prototype.unlinkAuthors = function(bookId) {
  this.state.authorBook = this.state.authorBook.filter((record) => {
    return record.bookId !== bookId;
  });
};

VueBooksApi.prototype.linkAuthors = function(bookId, authors) {
  // remove existing links first
  this.unlinkAuthors(bookId);
  authors.forEach((authorId) => {
    this.state.authorBook.push({
      id: window.uuidv4(),
      bookId,
      authorId,
    });
  });
};

VueBooksApi.prototype.createAuthor = function(data) {
  var author = {
    id: data.id ? data.id : window.uuidv4(),
  };
  if (data.firstName) {
    author.firstName = data.firstName;
  }
  if (data.lastName) {
    author.lastName = data.lastName;
  }
  return author;
};

VueBooksApi.prototype.createSeries = function(data) {
  var series = {
    id: data.id ? data.id : window.uuidv4(),
  };
  if (data.title) {
    series.title = data.title;
  }
  return series;
};
