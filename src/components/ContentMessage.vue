<template>
  <div class="content-message">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ContentMessage",
};
</script>

<style scoped>
.content-message {
  width: 100%;
  padding: 30px;
  margin: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: flex;
}
</style>
