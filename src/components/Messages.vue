<template>
  <div style="max-height:300px;overflow:auto">
    <label> LISTE DE MES MESSAGES</label><br />
    <table class="table">
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
        <!-- <td>
          <span
            class="remove-file btn btn-primary"
            v-on:click="deleteMessage(m)"
            ><i class="far fa-trash-alt"></i><br
          /></span>
        </td> -->
      </tr>
    </table>
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
        .post(this.server + "getUserMessages", {
          _id: this._id
        })
        .then(response => {
          this.messages = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted: function() {
    console.log(this._id);
    this.getMessages();
  }
};
</script>
