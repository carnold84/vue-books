<template>
  <list-item>
    <template slot="cell1">
      <router-link :to="url">
        <span class="title-text">{{ name }}</span>
      </router-link>
    </template>
    <template slot="actions">
      <round-link-button :to="author.editUrl">
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
  name: "AuthorItem",
  props: {
    author: {
      type: Object,
      default() {
        return {};
      },
    },
    onRemove: {
      type: Function,
    },
  },
  computed: {
    name() {
      let names = [];
      if (this.author.lastName) {
        names.push(this.author.lastName);
      }
      if (this.author.firstName) {
        names.push(this.author.firstName);
      }
      return names.join(", ");
    },
    url() {
      return `/books/author/${this.author.id}`;
    },
  },
  methods: {
    onRemoveClick() {
      this.onRemove(this.author.id);
    },
  },
  components: {
    ListItem,
    RoundButton,
    RoundLinkButton,
  },
};
</script>
