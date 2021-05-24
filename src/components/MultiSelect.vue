<template>
  <div class="multi-select-container">
    <multiselect
      :value="value"
      :options="options"
      :customLabel="label"
      :hideSelected="true"
      :placeholder="placeholder"
      track-by="id"
      :multiple="multiple"
      @input="updateSelected"
    />
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  name: "MultiSelect",
  components: {
    Multiselect,
  },
  data() {
    return {
      value: this.data.values,
      options: this.data.options,
    };
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    onChange: {
      type: Function,
      required: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    placeholder: String,
  },
  methods: {
    label(item) {
      return item.label;
    },
    updateSelected(result) {
      this.onChange(result);
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.multi-select-container {
  flex-grow: 1;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  display: flex;
}
</style>
<style lang="scss">
.multiselect__tag {
  background: var(--primary);
}
.multiselect__tag-icon {
  &:focus {
    background: var(--primary);
  }
  &:hover {
    background: var(--primary__HOVER);
  }
  &:after {
    color: #ffffff;
  }
}
.multiselect__option--highlight {
  background: var(--primary);
}
.multiselect__option--highlight::after {
  background: var(--primary);
}
</style>
