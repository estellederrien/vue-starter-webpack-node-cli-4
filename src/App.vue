<template>
  <div id="app">
    <!-- --------------------------------------------- TOPBAR ------------------------------------------------------------ -->

    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark ">
      <!-- Brand -->
      <a class="navbar-brand" href="#">Vue-Node-Starter</a>

      <!-- Toggler/collapsibe Button -->
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar links -->
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
        </ul>

        <!-- RIGHT -->
        <ul class="navbar-nav ml-auto">
          <!-- -----------------------------------------------------------DROPOWN MESSAGES----------------------------------------------------------------------- -->
          <!-- Nav Item - Messages -->
          <li class="submenu nav-item dropdown no-arrow mx-1 " v-if="$user._id">
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
              <span class="badge badge-danger badge-counter">7</span>
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
              <span
                class="mr-2 d-none d-lg-inline text-gray-600 small"
                id="BTnom"
                name="BTnom"
              ></span>
              <!-- <img
                      class="img-profile rounded-circle "
                      style="width:40px"
                     src="assets/img/defaut.png" 
                    /> -->
              <i class="fa fa-user fa-fw"></i>
            </a>
            <!-- Dropdown - User Information -->
            <div
              class="submenu dropdown-menu dropdown-menu-right shadow animated--grow-in "
              aria-labelledby="userDropdown"
            >
              <router-link v-if="$user._id" class="dropdown-item" to="/profile">
                <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>Mon
                profil</router-link
              >

              <!--  <router-link
                      class="dropdown-item"
                      to="/settings/:1"
                      disabled
                    >
                      <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i
                      >Réglages</router-link
                    > -->
              <router-link class="dropdown-item" to="/login" disabled>
                <i class="fas fa-sign-in-alt fa-sm fa-fw mr-2 text-gray-400"></i
                >Identification</router-link
              >
              <!--    <router-link
                      class="dropdown-item"
                      to="/settings/:1"
                      disabled
                    >
                      <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i
                      >Activité</router-link
                    > -->

              <div class="dropdown-divider"></div>

              <router-link class="dropdown-item" to="/logout" disabled>
                <i class="fas fa-sign-in-alt fa-sm fa-fw mr-2 text-gray-400"></i
                >Sortir !</router-link
              >
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <!-- --------------------------------------------- SIDEBAR ------------------------------------------------------------ -->

    <sidebar-menu
      :menu="menu"
      :width="width"
      :collapsed="collapsed"
      :theme="selectedTheme"
    />

    <!-- --------------------------------------------- VIEWS  ------------------------------------------------------------ -->
    <div style="margin-top:60px"><router-view></router-view></div>
  </div>
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
import Messages from "@/components/Messages.vue";
export default {
  name: "App",
  components: {
    SidebarMenu,
    messages: Messages
  },
  methods: {
    profile() {
      this.$router.push("/profile");
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

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-left: 50px;
  /* margin-top: 60px; */
}
a:hover {
  color: red important!;
  background-color: lightgrey;
  cursor: pointer;
}

a {
  color: blue;
}
.loader {
  width: 300px;
  height: 250px;
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
</style>
