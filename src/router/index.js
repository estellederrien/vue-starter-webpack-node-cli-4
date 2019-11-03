import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

import HelloWorld from "@/components/HelloWorld";
import About from "@/components/About";
import Users from "@/components/Users";
import User from "@/components/User";
import Register from "@/components/Register";
import Dashboard from "@/components/Dashboard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HelloWorld",
    component: HelloWorld
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/users",
    name: "Users",
    component: Users
  },
  {
    path: "/user",
    name: "User",
    component: User
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  }
];

const router = new VueRouter({
  routes
});

export default router;
