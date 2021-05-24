<template>
  <div class="ui-list">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "UiList",
  mounted() {
    const els = document.querySelectorAll(".list-item");
    els.forEach((el, i) => {
      el.style.transitionDelay = `${i * 30}ms`;
    });
    const wrapper = document.querySelector(".ui-list");
    wrapper.classList.add("show");
  },
};
</script>

<style scoped>
.ui-list {
  width: 100%;
  height: 100%;
  margin: 0;
  flex-direction: column;
  display: flex;
}
.list-item {
  opacity: 0;
  transform: translate3d(0, 50px, 0);
  transition: transform 350ms ease-out, opacity 350ms ease-out;
}
.show .list-item {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
</style>
