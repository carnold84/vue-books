<template>
  <Page id="authors">
    <template slot="header-left">
      <router-link to="/">{{ appName }}</router-link>
      <h2>/ Authors</h2>
    </template>
    <template slot="content">
      <action-bar :hasBorder="sortedAuthors.length === 0">
        <div class="action-bar-content">
          <h2>Authors</h2>
        </div>
        <div class="action-bar-actions">
          <round-link-button to="/add-author">
            <svgicon name="add" width="20" height="20"></svgicon>
          </round-link-button>
        </div>
      </action-bar>
      <ui-list v-if="sortedAuthors.length > 0">
        <author-item
          v-for="author in sortedAuthors"
          :key="author.id"
          :author="author"
          :onRemove="onRemove"
        />
      </ui-list>
      <content-message v-if="sortedAuthors.length === 0">
        <p>You don't have any authors yet.</p>
        <link-button to="/add-author">Add One</link-button>
      </content-message>
    </template>
  </Page>
</template>

<script>
import store from "@/store";
import { appMixins } from "@/mixins";
import Page from "@/components/Page";
import ActionBar from "@/components/ActionBar";
import ContentMessage from "@/components/ContentMessage";
import LinkButton from "@/components/LinkButton";
import RoundLinkButton from "@/components/RoundLinkButton";
import UiList from "@/components/UiList";
import AuthorItem from "@/containers/AuthorItem";
import "@/compiled-icons/add";

export default {
  name: "Authors",
  data() {
    return store.state;
  },
  components: {
    Page,
    ActionBar,
    ContentMessage,
    UiList,
    LinkButton,
    RoundLinkButton,
    AuthorItem,
  },
  mixins: [appMixins],
  computed: {
    sortedAuthors() {
      let authors = [];
      this.data.authors.allIds.forEach((authorId) => {
        const data = this.data.authors.byId[authorId];
        let author = {
          ...data,
          url: `/author/${authorId}`,
          editUrl: `/edit-author/${authorId}`,
        };
        authors.push(author);
      });

      return authors;
    },
  },
  methods: {
    onRemove(id) {
      store.removeAuthor(id);
    },
  },
};
</script>
