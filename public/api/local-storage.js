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
