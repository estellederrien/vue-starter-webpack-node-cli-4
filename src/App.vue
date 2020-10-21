<template>
<div id="app">
    <!-- --------------------------------------------- TOPBAR ------------------------------------------------------------ -->
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <!-- Brand -->
        <a class="navbar-brand" href="#">{{ t('APP_TITLE') }} by Nicolas Huleux V. {{v}}</a>
        <!-- Toggler/collapsibe Button -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>
        <!-- Navbar links -->
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav">

            </ul>
            <!-- RIGHT -->
            <ul class="navbar-nav ml-auto">
                 <b-nav-item-dropdown text="" right>
                    <template slot="button-content"><b>{{ t('LANG') }} </b></template>
                    <b-dropdown-item @click="change_app_language('FRENCH')">FRENCH</b-dropdown-item>
                    <b-dropdown-item @click="change_app_language('ENGLISH')">ENGLISH</b-dropdown-item>
                    <b-dropdown-item @click="change_app_language('SPANISH')">ESPAGNOL</b-dropdown-item>
                    <b-dropdown-item @click="change_app_language('DEUTSH')">DEUTSH</b-dropdown-item>
                    <b-dropdown-item @click="change_app_language('CHINESE')">CHINESE</b-dropdown-item>
                    <b-dropdown-item @click="change_app_language('HINDI')">HINDI</b-dropdown-item>
                    <b-dropdown-item :disabled="true" @click="change_app_language('JAPANESE')">JAPANESE(Comin soon)</b-dropdown-item>
                    <b-dropdown-item :disabled="true" @click="change_app_language('RUSSIAN')">RUSSIAN(Comin soon)</b-dropdown-item>
                </b-nav-item-dropdown>

                <!-- -----------------------------------------------------------DROPOWN MESSAGES----------------------------------------------------------------------- -->
                <!-- Nav Item - Messages -->
                <li class="submenu nav-item dropdown no-arrow mx-1" v-if="$store.state.logged">
                    <a class="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-envelope fa-fw"></i>
                        <span class="badge badge-danger badge-counter"></span>
                    </a>
                    <messages :_id="$store.getters.user._id"></messages>
                </li>
                <!-- -----------------------------------------------------------DROPOWN MENU------------------------------------------------------------------------ -->
                <li class="nav-item dropdown no-arrow">
                    <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="mr-2 d-none d-lg-inline text-gray-600 small" id="BTnom" name="BTnom"></span>

                        <i class="fa fa-user fa-fw"></i>
                    </a>
                    <!-- Dropdown - User Information -->
                    <div class="submenu dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                        <router-link v-if="$store.state.logged" class="dropdown-item" to="/profile">
                            <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>{{ t('PROFILE') }}
                        </router-link>

                        <router-link class="dropdown-item" to="/login" disabled>
                            <i class="fas fa-sign-in-alt fa-sm fa-fw mr-2 text-gray-400"></i>{{ t('LOGIN') }}
                        </router-link>

                        <div class="dropdown-divider"></div>
                        <div class="dropdown-item logout" @click="logout()" disabled>
                            <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>{{ t('LOGOUT') }}
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
import {
    SidebarMenu
} from "vue-sidebar-menu";
import Messages from "@/components/Messages.vue";
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
    name: "App",
    data() {
        return {
            v:""
        }
    },
    components: {
        SidebarMenu,
        messages: Messages
    },
    mounted() {
        // APPLICATION_VERSION is coming from the vue.config.js file and is set in package.json
        this.v = APPLICATION_VERSION;
        this.$translate.setLang("FRENCH");
    },
    watch: {
        '$store.state.logged': function () {
            console.log(this.$store.state.logged)
        }
    },
    methods: {
        profile() {
            this.$router.push("/profile");
        },
        change_app_language(lang) {
            this.$translate.setLang(lang);
            this.$forceUpdate();
            // Ugly way to change sidebar language 
            this.menu =  [{
                    header: true,
                    title: "Menu",
                    hiddenOnCollapse: true
                },
                {
                    href: "/",
                    title: this.$translate.text('HELLOWORLD'),
                    icon: "fab fa-trello"
                },
                {
                    href: "/users",
                    title: this.$translate.text('USERS'),
                    icon: "fas fa-users"
                },
                {
                    href: "/register",
                    title: this.$translate.text('REGISTER'),
                    icon: "fas fa-registered"
                },
                {
                    href: "/charts",
                    title: "Management",
                    icon: "fa fa-chart-area",
                    child: [{
                            href: "/dashboard",
                            title: this.$translate.text('DASHBOARD')
                        },
                        {
                            href: "/calendar",
                            title: this.$translate.text('CALENDAR')
                        },
                        {
                            href: "/table",
                            title: this.$translate.text('TABLE')
                        }
                    ]
                }
            ]
        },
        logout() {
            axios
                .post("logout", {})
                .then(response => {
                    // DELETE LOGGED IN USER DATA IN THE VUEX DATA STORE
                    this.$store.commit('deleteUser')
                    console.log(this.$store.getters.user)
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
            v: "",
            collapsed: true,
            width: "250px",
            relative: true,
            themes: [{
                    name: "Default theme",
                    input: ""
                },
                {
                    name: "White theme",
                    input: "white-theme"
                }
            ],
            selectedTheme: "dark-theme",
            menu: [{
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
                    child: [{
                            href: "/dashboard",
                            title: this.$translate.text('DASHBOARD')
                        },
                        {
                            href: "/calendar",
                            title: "Calendar"
                        },
                        {
                            href: "/table",
                            title: "Table Example"
                        }
                    ]
                }
            ]
        };
    }
};
</script>
/* MULTISELECT GLOBAL CSS */

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style><style>
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
@media only screen and (max-width: 300px) {}

/* SMARTPHONES LANDSCAPE */
@media only screen and (max-width: 480px) {}

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

.v-sidebar-menu>.vsm--list {
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
