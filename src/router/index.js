import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import HelloWorld from "@/components/HelloWorld";
import About from "@/components/About";
const AsyncUsers = () => import ("../components/Users.vue");
import User from "@/components/User";
import Register from "@/components/Register";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
const AsyncCalendar = () => import ("../components/Calendar.vue");
import Table from "@/components/Table";

const AsyncProfile = () => import ("../components/Profile.vue");

import axios from "axios";
axios.defaults.withCredentials = true;

// Checking if user has logged in on the node server
function logged_in() {}

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
    component: AsyncUsers
  },
  {
    path: "/user/:id",
    name: "User",
    component: User,
    props: true
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
  },
  {
    path: "/login",
    name: "Login",
    component: Login
    
   
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: AsyncCalendar
  },
  {
    path: "/table",
    name: "Table",
    component: Table
  },
{
    path :'*',
    component: HelloWorld
},

  {
    path: "/profile",
    name: "Profile",
    component: AsyncProfile
    
    ,
    beforeEnter: (to, from, next) => {
      
       if(localStorage.getItem('user')){
         console.log(localStorage.getItem('user'));
            next()
        }else{

            $router.push("/login");
            }
        }
    
  }
  
];

const router = new VueRouter({
  routes
});

export default router;

// ROUTES AUTH

/* router.beforeEach((to, from, next) => {
  axios(Vue.server + "getActualSession", {
    method: "post",
    withCredentials: true
  })
    .then(function(response) {
      return next();
    })
    .catch(function(error) {
      return false;
    });
});
 */
/* 
 beforeEnter(to, from, next) {
       axios(Vue.server + "getActualSession", {
        method: "post",
        withCredentials: true
      })
        .then(function(response) {
          next();
        })
        .catch(function(error) {
          router.push("/login");
        }); 
    } */
