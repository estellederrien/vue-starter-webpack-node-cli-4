<template>
  <div>
    <!--  {{this._id}}
    {{$user._id}}-->
    <!-- <h6 class="dropdown-header">Message Center</h6> -->

    <span v-for="m in messages">
      <button class="btn btn-block btn-primary">
        <div class="dropdown-list-image mr-3">
          <img
            class="rounded-circle"
            src="https://source.unsplash.com/fn_BT9fwg_E/60x60"
            :src="'/img/' + m.img"
            @error="replaceByDefault"
            alt
          />
          <div class="small text-gray-500">{{ m.senderName }}</div>
          <div class="status-indicator bg-success"></div>
        </div>
        {{ m.date }}
        <div class="font-weight-bold">
          <div class="text-truncate">{{ m.content }}</div>
        </div>
      </button>
    </span>
    <a></a>

    <!-- <a class="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a> -->
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  name: "messageslist",
  props: ["_id"],
  data() {
    return {
      messages: []
    };
  },

  methods: {
    replaceByDefault(e) {
      e.target.src = "/img/defaut.png";
    },
    getMessages: function() {
      axios
        .post("/getUserMessages", {
          _id: this._id
        })
        .then(response => {
          this.messages = response.data;
          this.$emit("mymcevent",this.messages.length);
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
    }
  },
  created: function() {
    this.getMessages();
  }
};
</script>
