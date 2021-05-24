<template>
  <div>
    <Loading v-if="isConfigLoading" />
    <router-view v-else />
  </div>
</template>

<script>
import store from "@/store";
import Loading from "@/components/Loading";

export default {
  name: "App",
  components: {
    Loading,
  },
  data() {
    return store.state;
  },
  created() {
    store.init(this.setTitle);
  },
  computed: {
    isConfigLoading() {
      return this.config === undefined;
    },
  },
  methods: {
    setTitle() {
      const elTitle = document.querySelector("title");
      elTitle.innerHTML = this.config.app.name;
    },
  },
};
</script>

<style lang="scss">
@import "styles/main.scss";
</style>
