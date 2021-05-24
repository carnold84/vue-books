<template>
  <router-link :to="to">
    <round-button :isButton="false" :isPrimary="isPrimary">
      <slot></slot>
    </round-button>
  </router-link>
</template>

<script>
import RoundButton from "@/components/RoundButton";

export default {
  name: "RoundLinkButton",
  components: {
    RoundButton,
  },
  props: ["to", "isPrimary"],
};
</script>
