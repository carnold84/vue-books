<template>
  <Page id="edit-book">
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
          <ui-button :height="32" :onClick="onCancel">Cancel</ui-button>
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
    return store.state;
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
    bookData() {
      if (this.$route.params.id) {
        return this.data.books.byId[this.$route.params.id];
      } else {
        return {};
      }
    },
    authorsData() {
      let options = [];
      let bookAuthors = [];
      let values = [];

      if (this.bookData !== undefined) {
        this.data.authorBook.forEach((record) => {
          if (this.bookData.id === record.bookId) {
            bookAuthors.push(record.authorId);
          }
        });
      }
      this.data.authors.allIds.forEach((authorId) => {
        const author = this.data.authors.byId[authorId];
        const authorData = {
          ...author,
          label: `${author.lastName}, ${author.firstName}`,
        };
        options.push(authorData);
        if (bookAuthors.includes(authorId)) {
          values.push(authorData);
        }
      });
      //this.bookAuthors = values;

      return {
        values,
        options,
      };
    },
    seriesData() {
      let options = [];
      let values = null;

      this.data.series.allIds.forEach((seriesId) => {
        const series = this.data.series.byId[seriesId];
        const seriesData = {
          ...series,
          label: series.title,
        };
        options.push(seriesData);
        if (seriesId === this.bookData.seriesId) {
          values = seriesData;
        }
      });
      //this.bookSeries = values;

      return {
        values,
        options,
      };
    },
  },
  methods: {
    onAuthorsChange(authors) {
      this.bookAuthors = authors;
    },
    onSeriesChange(series) {
      this.bookSeries = series;
    },
    onCancel(evt) {
      evt.preventDefault();
      this.$router.go(-1);
    },
    onSubmit(evt) {
      const data = serialize(evt.target, { hash: true });
      data.id = this.$route.params.id;
      data.authors = this.bookAuthors.map((author) => {
        return author.id;
      });
      data.seriesId = this.bookSeries ? this.bookSeries.id : undefined;
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
