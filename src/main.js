import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import ToolHandler from "./ToolHandler.js";
import store from "./store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(BootstrapVue);
Vue.prototype.ToolHandler = ToolHandler; // make data handler public

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
