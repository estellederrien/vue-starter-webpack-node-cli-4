<template>
  <div id="app">
    <!-- --------------------------------------------- TOPBAR ------------------------------------------------------------ -->

    <nav class="navbar navbar-expand-md navbar-custom navbar-light bg-light">
      <!-- Brand -->
      <a class="navbar-brand" href="#">Navbar</a>

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
          <li class="submenu nav-item dropdown no-arrow mx-1 ">
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

            <div
              class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="messagesDropdown"
            >
              <h6 class="dropdown-header">
                Message Center
              </h6>
              <a class="dropdown-item d-flex align-items-center" href="#">
                <div class="dropdown-list-image mr-3">
                  <img
                    class="rounded-circle"
                    src="https://source.unsplash.com/fn_BT9fwg_E/60x60"
                    alt=""
                  />
                  <div class="status-indicator bg-success"></div>
                </div>
                <div class="font-weight-bold">
                  <div class="text-truncate">
                    Hi there! I am wondering if you can help me with a problem
                    I've been having.
                  </div>
                  <div class="small text-gray-500">
                    Emily Fowler · 58m
                  </div>
                </div>
              </a>
              <a class="dropdown-item d-flex align-items-center" href="#">
                <div class="dropdown-list-image mr-3">
                  <img
                    class="rounded-circle"
                    src="https://source.unsplash.com/AU4VPcFN4LE/60x60"
                    alt=""
                  />
                  <div class="status-indicator"></div>
                </div>
                <div>
                  <div class="text-truncate">
                    I have the photos that you ordered last month, how would you
                    like them sent to you?
                  </div>
                  <div class="small text-gray-500">Jae Chun · 1d</div>
                </div>
              </a>
              <a class="dropdown-item d-flex align-items-center" href="#">
                <div class="dropdown-list-image mr-3">
                  <img
                    class="rounded-circle"
                    src="https://source.unsplash.com/CS2uCrpNzJY/60x60"
                    alt=""
                  />
                  <div class="status-indicator bg-warning"></div>
                </div>
                <div>
                  <div class="text-truncate">
                    Last month's report looks great, I am very happy with the
                    progress so far, keep up the good work!
                  </div>
                  <div class="small text-gray-500">
                    Morgan Alvarez · 2d
                  </div>
                </div>
              </a>
              <a class="dropdown-item d-flex align-items-center" href="#">
                <div class="dropdown-list-image mr-3">
                  <img
                    class="rounded-circle"
                    src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                    alt=""
                  />
                  <div class="status-indicator bg-success"></div>
                </div>
                <div>
                  <div class="text-truncate">
                    Am I a good boy? The reason I ask is because someone told me
                    that people say this to all dogs, even if they aren't
                    good...
                  </div>
                  <div class="small text-gray-500">
                    Chicken the Dog · 2w
                  </div>
                </div>
              </a>
              <a class="dropdown-item text-center small text-gray-500" href="#"
                >Read More Messages</a
              >
            </div>
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
              <router-link v-if="$userid" class="dropdown-item" to="/profile">
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
    <router-view></router-view>
  </div>
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";

export default {
  name: "App",
  components: {
    SidebarMenu
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

#navbarTop {
  margin-bottom: 30px;
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
