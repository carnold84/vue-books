<template>
  <Page id="edit-book">
    {{ authorsData }}
    <template slot="header-left">
      <router-link to="/">{{ appName }}</router-link>
      <h2>/ Add Book</h2>
    </template>
    <template slot="content">
      <form v-on:submit.prevent="onSubmit">
        <div class="anim-section">
          <text-field label="Title" name="title" :value="bookData.title" />
        </div>
        <div class="anim-section authors">
          <multi-select
            :data="authorsData"
            placeholder="Select Authors..."
            :onChange="onAuthorsChange"
            :multiple="true"
          />
          <round-link-button class="add-btn" to="/add-author">
            <svgicon name="add" width="20" height="20"></svgicon>
          </round-link-button>
        </div>
        <div class="anim-section series">
          <multi-select
            :data="seriesData"
            placeholder="Select Series..."
            :onChange="onSeriesChange"
          />
          <round-link-button class="add-btn" to="/add-series">
            <svgicon name="add" width="20" height="20"></svgicon>
          </round-link-button>
        </div>
        <div class="anim-section">
          <text-field
            label="Book Number"
            name="bookNumber"
            :value="bookData.bookNumber"
          />
        </div>
        <div class="form-buttons anim-section">
          <ui-button :height="32" :isButton="false" :onClick="onCancel"
            >Cancel</ui-button
          >
          <ui-button :isPrimary="true" :isSubmit="true" :height="32"
            >Save Book</ui-button
          >
        </div>
      </form>
    </template>
  </Page>
</template>

<script>
import serialize from "form-serialize";
import store from "@/store";
import { appMixins } from "@/mixins";
import Page from "@/components/Page";
import TextField from "@/components/TextField";
import UiButton from "@/components/UiButton";
import MultiSelect from "@/components/MultiSelect";
import RoundLinkButton from "@/components/RoundLinkButton";
import "@/compiled-icons/add";

export default {
  name: "EditBook",
  components: {
    Page,
    TextField,
    UiButton,
    MultiSelect,
    RoundLinkButton,
  },
  mixins: [appMixins],
  data() {
    return {
      config: store.state.config,
      authorsData: this.getAuthorsData(),
      seriesData: this.getSeriesData(),
    };
  },
  mounted() {
    const els = document.querySelectorAll(".anim-section");
    els.forEach((el, i) => {
      el.style.transitionDelay = `${i * 30}ms`;
    });
    const wrapper = document.querySelector("#edit-book");
    wrapper.classList.add("show");
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    bookData() {
      return this.getBookData();
    },
  },
  methods: {
    getAuthorsData() {
      let options = [];
      let bookAuthors = [];
      let values = [];
      const bookData = this.getBookData();

      if (bookData !== undefined) {
        store.state.data.authorBook.forEach((record) => {
          if (bookData.id === record.bookId) {
            bookAuthors.push(record.authorId);
          }
        });
      }

      store.state.data.authors.allIds.forEach((authorId) => {
        const author = store.state.data.authors.byId[authorId];
        const authorData = {
          ...author,
          label: `${author.lastName}, ${author.firstName}`,
        };
        options.push(authorData);
        if (bookAuthors.includes(authorId)) {
          values.push(authorData);
        }
      });

      return {
        values,
        options,
      };
    },
    getBookData() {
      if (this.$route.params.id) {
        return store.state.data.books.byId[this.$route.params.id];
      } else {
        return {};
      }
    },
    getSeriesData() {
      let options = [];
      let values = [];
      const bookData = this.getBookData();

      store.state.data.series.allIds.forEach((seriesId) => {
        const series = store.state.data.series.byId[seriesId];
        const seriesData = {
          ...series,
          label: series.title,
        };
        options.push(seriesData);
        if (seriesId === bookData.seriesId) {
          values = [seriesData];
        }
      });

      return {
        values,
        options,
      };
    },
    onAuthorsChange(authors) {
      this.authorsData.values.splice(
        0,
        this.authorsData.values.length,
        ...authors
      );
    },
    onSeriesChange(series) {
      this.$set(this.seriesData.values, 0, series);
    },
    onCancel(evt) {
      evt.preventDefault();
      this.$router.go(-1);
    },
    onSubmit(evt) {
      const data = serialize(evt.target, { hash: true });
      data.id = this.$route.params.id;
      data.authors = this.authorsData.values.map((author) => {
        return author.id;
      });
      data.seriesId =
        this.seriesData.values.length > 0
          ? this.seriesData.values[0].id
          : undefined;
      store.addBook(data);
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.authors {
  position: relative;
  margin: 0 0 20px;
  align-items: center;
  display: flex;
  z-index: 10;
}
.series {
  position: relative;
  margin: 0 0 20px;
  align-items: center;
  display: flex;
  z-index: 9;
}
.add-btn {
  margin: 0 0 0 10px;
}
</style>
