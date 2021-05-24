<template>
  <transition name="page">
    <Page>
      <slot></slot>
    </Page>
  </transition>
</template>

<script>
import Page from "@/components/Page";

export default {
  name: "TransitionPage",
  components: {
    Page,
  },
};
</script>

<style scoped>
.page {
  position: absolute;
  width: 100%;
  height: 100%;
  flex-direction: column;
  display: flex;
}
.page-enter-active,
.page-leave-active {
  transition: opacity 300ms ease-out, transform 300ms ease-out;
}
.page-enter {
  transform: translate3d(100%, 0, 0);
}
.page-enter-to {
  transform: translate3d(0, 0, 0);
}
.page-leave {
  opacity: 1;
}
.page-leave-to {
  opacity: 0;
}
</style>
