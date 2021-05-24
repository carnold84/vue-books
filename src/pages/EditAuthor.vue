<template>
  <Page id="edit-author">
    <template slot="header-left">
      <router-link to="/">{{ appName }}</router-link>
      <h2>/ {{ title }}</h2>
    </template>
    <template slot="content">
      <form v-on:submit.prevent="onSubmit">
        <div class="anim-section">
          <text-field
            label="First Name"
            name="firstName"
            :value="authorData.firstName"
          />
        </div>
        <div class="anim-section">
          <text-field
            label="Last Name"
            name="lastName"
            :value="authorData.lastName"
          />
        </div>
        <div class="form-buttons anim-section">
          <ui-button :height="32" :onClick="onCancel">Cancel</ui-button>
          <ui-button :isPrimary="true" :height="32">{{
            submitLabel
          }}</ui-button>
        </div>
      </form>
    </template>
  </Page>
</template>

<script>
import serialize from "form-serialize";
import store from "@/store";
import { appMixins } from "@/mixins";
import Page from "@/components/Page";
import TextField from "@/components/TextField";
import UiButton from "@/components/UiButton";

export default {
  name: "EditAuthor",
  components: {
    Page,
    TextField,
    UiButton,
  },
  mixins: [appMixins],
  data() {
    return store.state;
  },
  mounted() {
    const els = document.querySelectorAll(".anim-section");
    els.forEach((el, i) => {
      el.style.transitionDelay = `${i * 30}ms`;
    });
    const wrapper = document.querySelector("#edit-author");
    wrapper.classList.add("show");
  },
  computed: {
    title() {
      if (this.$route.params.id) {
        return "Edit Author";
      } else {
        return "Add Author";
      }
    },
    submitLabel() {
      if (this.$route.params.id) {
        return "Save Changes";
      } else {
        return "Create Author";
      }
    },
    authorData() {
      if (this.$route.params.id) {
        return this.data.authors.byId[this.$route.params.id];
      } else {
        return {};
      }
    },
  },
  methods: {
    onCancel(evt) {
      evt.preventDefault();
      this.$router.go(-1);
    },
    onSubmit(evt) {
      const data = serialize(evt.target, { hash: true });
      data.id = this.$route.params.id;
      store.addAuthor(data);
      this.$router.go(-1);
    },
  },
};
</script>
