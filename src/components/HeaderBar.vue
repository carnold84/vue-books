<template>
  <header class="header-bar">
    <div class="content-left">
      <span class="logo">
        <svgicon name="logo" width="24" height="24"></svgicon>
      </span>
      <slot name="content-left"></slot>
    </div>
    <div class="content-right">
      <slot name="content-right"></slot>
    </div>
  </header>
</template>

<script>
import "@/compiled-icons/logo";

export default {
  name: "HeaderBar",
};
</script>

<style lang="scss" scoped>
@import "@/styles/_include-media.scss";

.header-bar {
  width: 100%;
  height: 50px;
  font-size: 1em;
  color: #ffffff;
  margin: 0;
  padding: 0 40px;
  background-color: var(--primary);
  border-bottom: var(--primary) solid 1px;
  box-shadow: rgba(0, 0, 0, 0.5) 0 1px 2px;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  display: flex;
}

.logo {
  margin: 0 10px 0 0;
}

.content-left,
.content-right {
  align-items: center;
  display: flex;

  h1,
  h2 {
    font-size: 1em;
    font-weight: normal;
    margin: 0;
  }

  a {
    color: #ffffff;
    border-bottom: #ffffff dotted 1px;
    margin: 1px 5px 0 0;
  }

  a:hover {
    color: #e98400;
    border-bottom: var(--secondary) dotted 1px;
    margin: 1px 5px 0 0;
  }
}
@include media("<=tablet") {
  .header-bar {
    padding: 0 20px;
  }
}
</style>
