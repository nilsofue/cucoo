import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import DataHandler from "./DataHandler.js";
import store from "./store";

Vue.use(BootstrapVue);
Vue.prototype.DataHandler = DataHandler; // make data handler public

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
