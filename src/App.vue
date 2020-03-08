<template>
    <div id="app">
        <!-- --------------------------------------------- TOPBAR ------------------------------------------------------------ -->

        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <!-- Brand -->
            <a class="navbar-brand" href="#">Vue-Node-Starter by Nicolas Huleux</a>

            <!-- Toggler/collapsibe Button -->
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Navbar links -->
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav">
                    <!-- <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>-->
                </ul>

                <!-- RIGHT -->
                <ul class="navbar-nav ml-auto">
                    <!-- -----------------------------------------------------------DROPOWN MESSAGES----------------------------------------------------------------------- -->
                    <!-- Nav Item - Messages -->
                    <li class="submenu nav-item dropdown no-arrow mx-1" v-if="$user._id">
                        <a
                            class="nav-link dropdown-toggle"
                            href="#"
                            id="messagesDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i class="fas fa-envelope fa-fw"></i>
                            <!-- Counter - Messages -->
                            <span class="badge badge-danger badge-counter"></span>
                        </a>
                        <messages :_id="$user._id"></messages>
                    </li>
                    <!-- -----------------------------------------------------------DROPOWN MENU------------------------------------------------------------------------ -->
                    <li class="nav-item dropdown no-arrow">
                        <a
                            class="nav-link dropdown-toggle"
                            href="#"
                            id="userDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <span class="mr-2 d-none d-lg-inline text-gray-600 small" id="BTnom" name="BTnom"></span>
                            <!-- <img
                      class="img-profile rounded-circle "
                      style="width:40px"
                     src="assets/img/defaut.png" 
              />-->
                            <i class="fa fa-user fa-fw"></i>
                        </a>
                        <!-- Dropdown - User Information -->
                        <div class="submenu dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                            <router-link v-if="$user._id" class="dropdown-item" to="/profile">
                                <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>Mon profil
                            </router-link>

                            <!--  <router-link
                      class="dropdown-item"
                      to="/settings/:1"
                      disabled
                    >
                      <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i
                      >Réglages</router-link
              >-->
                            <router-link class="dropdown-item" to="/login" disabled>
                                <i class="fas fa-sign-in-alt fa-sm fa-fw mr-2 text-gray-400"></i>Identification
                            </router-link>
                            <!--    <router-link
                      class="dropdown-item"
                      to="/settings/:1"
                      disabled
                    >
                      <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i
                      >Activité</router-link
              >-->

                            <div class="dropdown-divider"></div>

                            <div class="dropdown-item logout" @click="logout()" disabled>
                                <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>Sortir !
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <notifications group="foo" animation-type="velocity" />
        </nav>
        <!-- --------------------------------------------- SIDEBAR ------------------------------------------------------------ -->

        <sidebar-menu :menu="menu" :width="width" :collapsed="collapsed" :theme="selectedTheme" />

        <!-- --------------------------------------------- VIEWS  ------------------------------------------------------------ -->
        <div style="margin-top:60px">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
import Messages from "@/components/Messages.vue";
import axios from "axios";
axios.defaults.withCredentials = true;

export default {
    name: "App",
    props: ["loggedin"],
    components: {
        SidebarMenu,
        messages: Messages
    },
    methods: {
        profile() {
            this.$router.push("/profile");
        },
        logout() {
            axios
                .post("logout", {})
                .then(response => {
                    this.$user = {};
                    localStorage.removeItem("user");

                    this.$notify({
                        type: "success",
                        group: "foo",
                        title: "Hey! ",
                        text: "Logged out!"
                    });
                    this.$router.push("/users");
                })
                .catch(error => {
                    this.$router.push("/login");
                });
        }
    },
    data() {
        return {
            collapsed: true,
            width: "250px",
            relative: true,

            themes: [
                {
                    name: "Default theme",
                    input: ""
                },
                {
                    name: "White theme",
                    input: "white-theme"
                }
            ],
            selectedTheme: "dark-theme",
            menu: [
                {
                    header: true,
                    title: "Menu",
                    hiddenOnCollapse: true
                },
                {
                    href: "/",
                    title: "HelloWorld",
                    icon: "fab fa-trello"
                },
                {
                    href: "/users",
                    title: "Users",
                    icon: "fas fa-users"
                },
                {
                    href: "/register",
                    title: "Register",
                    icon: "fas fa-registered"
                },
                {
                    href: "/charts",
                    title: "Management",
                    icon: "fa fa-chart-area",
                    child: [
                        {
                            href: "/dashboard",
                            title: "Tableau de bord"
                        },
                        {
                            href: "/calendar",
                            title: "Calendrier"
                        },
                        {
                            href: "/table",
                            title: "Table"
                        }
                    ]
                }
            ]
        };
    }
};
</script>
/* MULTISELECT GLOBAL CSS */
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-left: 50px;
}

/* -----------------------------------------------------------------------MEDIAS QUERIES --------------------------------------------------------------------- */

/* SMARTPHONES PORTRAIT */
@media only screen and (max-width: 300px) {
}

/* SMARTPHONES LANDSCAPE */
@media only screen and (max-width: 480px) {
}

/* TABLETS PORTRAIT */
@media only screen and (max-width: 768px) {
    #app {
        font-size: 14px !important;
    }

    label {
        font-size: 12px;
    }
    .btn {
        font-size: 12px !important;
        padding: 4px 6px;
    }
    .label {
        font-size: 12px !important;
    }
    .navbar-brand {
        display: none !important;
    }

}

/* TABLET LANDSCAPE / DESKTOP */
@media only screen and (max-width: 1024px) {
    #app {
        font-size: 12px;
    }
    label {
        font-size: 14px !important;
    }
    .btn {
        font-size: 14px;
        padding: 6px 12px;
    }
    .loader {
        width: 200px !important;
        height: 150px !important;
    }
}

/* ----------------------------------------------------------------------- END MEDIAS QUERIES --------------------------------------------------------------------- */

/* -----------------------------------------------------------------------  MOST COMMON CSS --------------------------------------------------------------------- */

/* Buttons */
.btn {
    color: white !important; 
      /* background-color: #ddd; */
   background-color: #ddd;
  border: none;
  color: black;
  padding: 16px 32px;
  text-align: center;
  font-size: 16px;
  margin: 4px 2px;
  transition: 0.3s !important;
}

.btn:hover {
  background-color: yellow !important;
  color: black !important;
}

/* change all .btn to .btn-sm size on xs */
@include media-breakpoint-between(xs, sm) {
    .btn {
        @include button-size($input-btn-padding-y-sm, $input-btn-padding-x-sm, $font-size-sm, $line-height-sm, $btn-border-radius-sm);
    }
}

/* Links  */
.a {
    color: maroon;
}

a:hover {
    background-color: lightgrey;
    cursor: pointer;
}

/* ---------------------------------------------------------------------------GRAPHICAL ELEMENTS -----------------------------------------------*/
.loader {
    width: 300px;
    height: 250px;
}

.logout {
    cursor: pointer;
}

#navbarTop {
    margin-bottom: 60px;
}

.v-sidebar-menu > .vsm--list {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    margin-top: 55px;
}

/* change the background color */
.navbar-custom {
    background-color: lightgrey;
}

/* change the brand and text color */
.navbar-custom .navbar-brand,
.navbar-custom .navbar-text {
    color: black;
}

/* change the link color */
.navbar-custom .navbar-nav .nav-link {
    color: black;
}

/* change the color of active or hovered links */
.navbar-custom .nav-item.active .nav-link,
.navbar-custom .nav-item:focus .nav-link,
.navbar-custom .nav-item:hover .nav-link {
    color: black;
}

.navbar-toggler {
    background-color: black;
    color: Red;
}

/* 
CHANGE ALL MODALS BEHAVIOR */
.v--modal-overlay .v--modal-box {
    position: relative !important;
    overflow: visible !important;
}
</style>
