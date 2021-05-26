import defaultApi from "../api/local-storage";

let api = defaultApi;

const store = {
  debug: true,
  state: {
    config: undefined,
    data: {
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
    },
  },
  init(onComplete) {
    if (this.debug) {
      console.info("init triggered");
    }

    this.state.config = window.app.config;
    const CustomApi = window[this.state.config.app.apiName];
    api = CustomApi !== undefined ? new CustomApi() : api;
    api.init(this.state.config.app.dbName, (response) => {
      this.state.data = response.data;

      if (onComplete) {
        onComplete();
      }
    });
  },
  getAllData() {
    api.getAllData((response) => {
      this.state.data = response.data;
    });
  },
  addBook(data) {
    if (this.debug) {
      console.info("addBook triggered with", data);
    }

    api.addBook(data, (response) => {
      this.state.data = response.data;
    });
  },
  removeBook(id) {
    if (this.debug) {
      console.info("removeBook triggered with", id);
    }

    api.removeBook(id, (response) => {
      this.state.data = response.data;
    });
  },
  addAuthor(data) {
    if (this.debug) {
      console.info("addAuthor triggered with", data);
    }

    api.addAuthor(data, (response) => {
      this.state.data = response.data;
    });
  },
  removeAuthor(id) {
    if (this.debug) {
      console.info("removeAuthor triggered with", id);
    }

    api.removeAuthor(id, (response) => {
      this.state.data = response.data;
    });
  },
  addSeries(data) {
    if (this.debug) {
      console.info("addSeries triggered with", data);
    }

    api.addSeries(data, (response) => {
      this.state.data = response.data;
    });
  },
  removeSeries(id) {
    if (this.debug) {
      console.info("removeSeries triggered with", id);
    }

    api.removeSeries(id, (response) => {
      this.state.data = response.data;
    });
  },
  getBookAuthors(bookId) {
    const authors = [];

    if (bookId) {
      this.state.data.authorBook.allIds.map((id) => {
        const bookAuthor = this.state.data.authorBook.byId[id];

        if (bookAuthor.bookId === bookId) {
          const author = this.state.data.authors.byId[bookAuthor.authorId];
          authors.push(author);
        }
      });
    }

    return authors;
  },
  getBookSeries(bookId) {
    if (bookId) {
      const book = this.state.data.books.byId[bookId];
      return this.state.data.series.byId[book.seriesId];
    }

    return;
  },
};

export default store;
