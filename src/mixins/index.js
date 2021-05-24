export const appMixins = {
  computed: {
    appName() {
      return this.config.app.name;
    },
  },
};

export const authorMixins = {
  methods: {
    getAuthor(id) {
      return this.data.authors.byId[id];
    },
    getAuthorName(id) {
      const author = this.getAuthor(id);
      let names = [];
      if (author.firstName) {
        names.push(author.firstName);
      }
      if (author.lastName) {
        names.push(author.lastName);
      }
      return names.join(" ");
    },
  },
};

export const seriesMixins = {
  methods: {
    getSeries(id) {
      return this.data.series.byId[id];
    },
    getSeriesTitle(id) {
      const series = this.getSeries(id);
      return series.title;
    },
  },
};
