<template>
  <div class="loading">
    <svgicon name="logo" width="24" height="24"></svgicon>
  </div>
</template>

<script>
import "@/compiled-icons/logo";

export default {
  name: "Loading",
};
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  width: 100%;
  height: 100%;
  color: var(--loading-icon-color);
  margin: 0;
  animation: pulse 2500ms infinite ease;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
}
@keyframes pulse {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
