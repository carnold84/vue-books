import Vue from "vue";
import VueSVGIcon from "vue-svgicon";
import VueSVGCustomIcon from "vue-svg-custom-icon";
import router from "@/router";
import App from "@/App";

Vue.use(VueSVGIcon);
Vue.use(VueSVGCustomIcon, { basePath: "./static/svg" });

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
