<template>
  <div :id="id" class="page">
    <header-bar>
      <template slot="content-left">
        <slot name="header-left"></slot>
      </template>
      <nav slot="content-right">
        <router-link to="/">Books</router-link>
        <router-link to="/authors">Authors</router-link>
        <router-link to="/series">Series</router-link>
      </nav>
    </header-bar>
    <main class="main">
      <div class="content" :style="{ maxWidth }">
        <slot name="content"></slot>
      </div>
    </main>
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar";

export default {
  name: "Page",
  props: {
    id: {
      type: String,
    },
    maxWidth: {
      default() {
        return "1080px";
      },
      type: String,
    },
  },
  components: {
    HeaderBar,
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_include-media.scss";

.page {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  overflow: hidden;
  align-items: center;
  flex-direction: column;
  display: flex;
}
.main {
  width: 100%;
  flex-grow: 1;
  align-items: center;
  flex-direction: column;
  display: flex;
  overflow: auto;
}
.content {
  width: 100%;
  padding: 20px 40px 40px;
}
@include media("<=tablet") {
  .content {
    padding: 20px;
  }
}
h1 {
  font-size: 1.1em;
  font-weight: normal;
  color: #ffffff;
  margin: 0;
}
h2 {
  font-size: 1.2em;
  font-weight: normal;
  margin: 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
