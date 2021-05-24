<template>
  <router-link :to="to">
    <ui-button :isButton="false" :isPrimary="isPrimary">
      <slot></slot>
    </ui-button>
  </router-link>
</template>

<script>
import UiButton from "@/components/UiButton";

export default {
  name: "LinkButton",
  components: {
    UiButton,
  },
  props: ["to", "isPrimary"],
};
</script>
