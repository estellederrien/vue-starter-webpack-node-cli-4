<template>
  <div
    class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
    aria-labelledby="messagesDropdown"
  >
    <!--  <table class="table">
      <tr v-for="m in messages">
        <td>
          {{ m.date }}
        </td>
        <td>
          <span class="badge">From:{{ m.senderName }}</span>
        </td>
        <td>
          {{ m.content }}
        </td>
      </tr>
    </table>-->

    <h6 class="dropdown-header">Message Center</h6>
    <a class="dropdown-item d-flex align-items-center" href="#" v-for="m in messages">
      <div class="dropdown-list-image mr-3">
        <img
          class="rounded-circle"
          src="https://source.unsplash.com/fn_BT9fwg_E/60x60"
          :src="'/img/' + m.img"
          @error="replaceByDefault"
          alt
        />
        <div class="status-indicator bg-success"></div>
      </div>
      <div class="font-weight-bold">
        <div class="text-truncate">{{ m.content }}</div>
        <div class="small text-gray-500">{{ m.senderName }} · {{ m.date }}</div>
      </div>
    </a>

    <!-- <a class="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a> -->
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  name: "messages",
  props: ["_id"],
  data() {
    return {
      messages: []
    };
  },

  methods: {
    getMessages: function() {
      axios
        .post("/readUserMessages", {
          _id: this._id
        })
        .then(response => {
          this.messages = response.data;
        })
        .catch(error => {
          console.log(error);
          this.$notify({
            type: "error",
            group: "foo",
            title: "Hey! ",
            text: error
          });
        });
    },
    replaceByDefault(e) {
      e.target.src = "/img/defaut.png";
    }
  },
  mounted: function() {
    this.getMessages();
  }
};
</script>
