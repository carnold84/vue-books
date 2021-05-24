<template>
  <Page id="series">
    <template slot="header-left">
      <router-link to="/">{{ appName }}</router-link>
      <h2>/ Series</h2>
    </template>
    <template slot="content">
      <action-bar :hasBorder="sortedSeries.length === 0">
        <div class="action-bar-content">
          <h2>Series</h2>
        </div>
        <div class="action-bar-actions">
          <round-link-button to="/add-series">
            <svgicon name="add" width="20" height="20"></svgicon>
          </round-link-button>
        </div>
      </action-bar>
      <ui-list v-if="sortedSeries.length > 0">
        <series-item
          v-for="series in sortedSeries"
          :key="series.id"
          :series="series"
          :onRemove="onRemove"
        />
      </ui-list>
      <content-message v-if="sortedSeries.length === 0">
        <p>You don't have any series yet.</p>
        <link-button to="/add-series">Add One</link-button>
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
import SeriesItem from "@/containers/SeriesItem";
import "@/compiled-icons/add";

export default {
  name: "Series",
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
    SeriesItem,
  },
  mixins: [appMixins],
  computed: {
    sortedSeries() {
      let seriesData = [];
      this.data.series.allIds.forEach((seriesId) => {
        const data = this.data.series.byId[seriesId];
        let series = {
          ...data,
          url: `/series/${seriesId}`,
          editUrl: `/edit-series/${seriesId}`,
        };
        seriesData.push(series);
      });

      return seriesData;
    },
  },
  methods: {
    onRemove(id) {
      store.removeSeries(id);
    },
  },
};
</script>
