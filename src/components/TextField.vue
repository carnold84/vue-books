<template>
  <div class="text-field">
    <label class="label" :for="name">{{ label }}</label>
    <input class="input" :id="name" type="text" :name="name" :value="value" />
  </div>
</template>

<script>
export default {
  name: "TextField",
  props: ["label", "name", "value"],
};
</script>

<style lang="scss" scoped>
.text-field {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 0 20px;
  flex-direction: column;
  display: flex;
}
.label {
  width: 100%;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
  margin: 0 0 5px;
}
.input {
  width: 100%;
  font-size: 26px;
  line-height: 26px;
  color: rgba(0, 0, 0, 0.8);
  padding: 3px 0 0;
  border: none;
  border-bottom: #eeeeee solid 1px;
}
.input:focus {
  outline: none;
  border-bottom: var(--primary) solid 1px;
}
</style>
