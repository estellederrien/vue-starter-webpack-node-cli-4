import Vue from "vue";
import VueRouter from "vue-router";

import HelloWorld from "@/components/HelloWorld";
import User from "@/components/User";
import Register from "@/components/Register";
import Login from "@/components/Login";
import Table from "@/components/Table";


// ASYNC COMPONENT LOADINGS
const AsyncUsers = () => import ("../components/Users.vue");
const AsyncProfile = () => import ("../components/Profile.vue");
const AsyncDashboard = () => import ("../components/Dashboard.vue");
const AsyncCalendar = () => import ("../components/Calendar.vue");

import axios from "axios";
axios.defaults.withCredentials = true;



Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HelloWorld",
    component: HelloWorld
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
    component: AsyncDashboard
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
