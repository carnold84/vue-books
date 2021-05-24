<template>
  <list-item>
    <template slot="cell1">{{ book.title }}</template>
    <template v-if="authors" slot="cell2">
      <router-link
        v-for="author in authors"
        :key="author.key"
        :to="author.url"
        :title="author.label"
      >
        <span class="title-text">{{ author.label }}</span>
      </router-link>
    </template>
    <template slot="cell3">
      <router-link v-if="series" :to="series.url">
        <span class="title-text">{{ series.title }}</span>
      </router-link>
      <span v-if="book.bookNumber">{{ `- Book ${book.bookNumber}` }}</span>
    </template>
    <template slot="actions">
      <round-link-button :to="book.editUrl">
        <svgicon name="edit" width="18" height="18"></svgicon>
      </round-link-button>
      <round-button :onClick="onRemoveClick">
        <svgicon name="delete" width="18" height="18"></svgicon>
      </round-button>
    </template>
  </list-item>
</template>

<script>
import ListItem from "@/components/ListItem";
import RoundButton from "@/components/RoundButton";
import RoundLinkButton from "@/components/RoundLinkButton";
import "@/compiled-icons/edit";
import "@/compiled-icons/delete";

export default {
  name: "BookItem",
  props: {
    book: {
      type: Object,
      default() {
        return {};
      },
    },
    onRemove: {
      type: Function,
    },
  },
  methods: {
    onRemoveClick() {
      this.onRemove(this.book.id);
    },
  },
  components: {
    ListItem,
    RoundButton,
    RoundLinkButton,
  },
  computed: {
    authors() {
      return this.book.authors.map((author) => {
        return {
          ...author,
          key: `${this.book.id}-${author.id}`,
          label: `${author.lastName}, ${author.firstName}`,
          url: `/books/author/${author.id}`,
        };
      });
    },
    series() {
      let series = null;
      if (this.book.series) {
        series = {
          ...this.book.series,
          url: `/books/series/${this.book.series.id}`,
        };
      }
      return series;
    },
  },
};
</script>
