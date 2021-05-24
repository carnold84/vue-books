<template>
  <list-item>
    <template slot="cell1">
      <router-link :to="url">
        <span class="title-text">{{ series.title }}</span>
      </router-link>
    </template>
    <template slot="actions">
      <round-link-button :to="series.editUrl">
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
  name: "SeriesItem",
  props: {
    series: {
      type: Object,
      default() {
        return {};
      },
    },
    onRemove: {
      type: Function,
    },
  },
  components: {
    ListItem,
    RoundButton,
    RoundLinkButton,
  },
  computed: {
    url() {
      return `/books/series/${this.series.id}`;
    },
  },
  methods: {
    onRemoveClick() {
      this.onRemove(this.series.id);
    },
  },
};
</script>
