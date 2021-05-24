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
      seriesBook: [],
    },
  },
  init(onComplete) {
    if (this.debug) {
      console.info("init triggered");
    }

    this.state.config = window.app.config;
    const CustomApi = window[this.state.config.app.apiName];
    api = CustomApi !== undefined ? new CustomApi() : api;
    api.init(this.state.config.dbName, (response) => {
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
};

export default store;
