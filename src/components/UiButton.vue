<template>
  <button
    v-if="isButton"
    v-on:click="click"
    :class="{ 'ui-button': true, 'is-primary': isPrimary }"
    :style="style"
  >
    <slot></slot>
  </button>
  <div
    v-else
    :class="{ 'ui-button': true, 'is-primary': isPrimary }"
    :style="style"
    v-on:click="click"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "UiButton",
  props: {
    isButton: {
      type: Boolean,
      default: true,
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function,
      default: null,
    },
    height: {
      type: Number,
      default: 28,
    },
  },
  computed: {
    style() {
      return {
        height: `${this.height}px`,
      };
    },
  },
  methods: {
    click(evt) {
      if (this.onClick) {
        this.onClick(evt);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.ui-button {
  font-size: 14px;
  line-height: 17px;
  color: var(--font-color-secondary);
  padding: 0 12px;
  border: var(--button-border-color) solid 1px;
  background-color: var(--button-bg-color);
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.15) 0 1px 1px;
  cursor: pointer;
  align-items: center;
  display: flex;

  &:hover {
    color: var(--font-color-primary);
    background-color: var(--button-bg-color__HOVER);
    border: var(--button-border-color__HOVER) solid 1px;
    box-shadow: rgba(0, 0, 0, 0.25) 0 1px 3px;
  }
  &.is-primary {
    color: rgba(255, 255, 255, 1);
    border: var(--button-primary-border-color) solid 1px;
    background-color: var(--button-primary-bg-color);
    box-shadow: rgba(0, 0, 0, 0.35) 0 1px 2px;

    &:hover {
      border: var(--button-primary-border-color__HOVER) solid 1px;
      background-color: var(--button-primary-bg-color__HOVER);
      box-shadow: rgba(0, 0, 0, 0.55) 0 1px 4px;
    }
  }
}
</style>
