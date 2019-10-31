import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Overview.vue";
import Calendar from "../views/Calendar.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "overview",
    component: Home
  },
  {
    path: "/calendar",
    name: "calendar",
    component: Calendar
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () =>
    //import(/* webpackChunkName: "about" */ "../views/Calendar.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
