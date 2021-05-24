<template>
  <div :class="{ 'action-bar': true, 'has-border': hasBorder }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ActionBar",
  props: {
    hasBorder: {
      default() {
        return true;
      },
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
.action-bar {
  width: 100%;
  height: 40px;
  font-size: 1em;
  margin: 0;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  display: flex;

  &.has-border {
    border-bottom: #dddddd solid 1px;
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
</style>
