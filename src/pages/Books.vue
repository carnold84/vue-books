<template>
  <Page id="books">
    <template slot="header-left">
      <router-link to="/">{{ appName }}</router-link>
    </template>
    <template slot="content">
      <action-bar :hasBorder="sortedBooks.length === 0">
        <div class="action-bar-content">
          <h2>{{ title }}</h2>
        </div>
        <div class="action-bar-actions">
          <round-link-button to="/add-book">
            <svgicon name="add" width="20" height="20"></svgicon>
          </round-link-button>
        </div>
      </action-bar>
      <ui-list v-if="sortedBooks.length > 0">
        <book-item
          v-for="book in sortedBooks"
          :key="book.id"
          :book="book"
          :onRemove="onRemove"
        />
      </ui-list>
      <content-message v-if="sortedBooks.length === 0">
        <p>You don't have any books yet.</p>
        <link-button to="/add-book">Add One</link-button>
      </content-message>
    </template>
  </Page>
</template>

<script>
import store from "@/store";
import { appMixins, authorMixins, seriesMixins } from "@/mixins";
import Page from "@/components/Page";
import ActionBar from "@/components/ActionBar";
import ContentMessage from "@/components/ContentMessage";
import LinkButton from "@/components/LinkButton";
import RoundLinkButton from "@/components/RoundLinkButton";
import UiList from "@/components/UiList";
import BookItem from "@/containers/BookItem";
import "@/compiled-icons/add";

export default {
  name: "Books",
  data() {
    return store.state;
  },
  components: {
    Page,
    ActionBar,
    ContentMessage,
    LinkButton,
    RoundLinkButton,
    UiList,
    BookItem,
  },
  mixins: [appMixins, authorMixins, seriesMixins],
  computed: {
    authorId() {
      if (this.$route.name === "AuthorBooks") {
        return this.$route.params.name;
      } else {
        return undefined;
      }
    },
    seriesId() {
      if (this.$route.name === "SeriesBooks") {
        return this.$route.params.title;
      } else {
        return undefined;
      }
    },
    title() {
      if (this.authorId) {
        const author = this.getAuthorName(this.authorId);
        return `Books by ${author}`;
      } else if (this.seriesId) {
        const series = this.getSeriesTitle(this.seriesId);
        return `Books in ${series}`;
      } else {
        return `Books`;
      }
    },
    sortedBooks() {
      let books = [];
      this.data.books.allIds.forEach((bookId) => {
        const data = this.data.books.byId[bookId];
        let book = {
          ...data,
          authors: this.getBookAuthors(bookId),
          series: this.getBookSeries(data.seriesId),
          url: `/book/${bookId}`,
          editUrl: `/edit-book/${bookId}`,
        };
        if (this.authorId) {
          const isByAuthor = book.authors.find((element) => {
            return element.id === this.authorId;
          });
          if (isByAuthor) {
            books.push(book);
          }
        } else if (this.seriesId) {
          if (book.series && book.series.id === this.seriesId) {
            books.push(book);
          }
        } else {
          books.push(book);
        }
      });

      return books;
    },
  },
  methods: {
    onRemove(id) {
      store.removeBook(id);
    },
    getBookAuthors(bookId) {
      let authors = [];
      this.data.authorBook.forEach((record) => {
        if (record.bookId === bookId) {
          authors.push(this.data.authors.byId[record.authorId]);
        }
      });
      return authors;
    },
    getBookSeries(seriesId) {
      return this.data.series.byId[seriesId];
    },
  },
};
</script>
