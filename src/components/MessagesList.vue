<template>
<div>
    <b-card v-for="m in messages" border-variant="dark" no-body class="overflow-hidden card-message">
        <b-row no-gutters>
            <b-col md="2">
                <b-card-img class="message-img rounded-0" v-if="m.img !== ''" :src="m.img" alt="Image"></b-card-img>
                <img class="message-img rounded-0" v-if="m.img == '' || m.img == Undefined " src="../assets/img/defaut.jpg" alt="Image"></img>
                <span style="font-size:0.8em">{{m.from}} </span><br>
                <span style="font-size:0.8em;color:blue">{{m.date | moment('from', 'now') }} </span>
            </b-col>
            <b-col md="10">
                <b-card-body>
                    <b-card-text style="text-align:left;margin-left:20px;">
                        <b-icon icon="chat-left"></b-icon> {{m.content }}
                    </b-card-text>
                </b-card-body>
            </b-col>
        </b-row>
    </b-card>
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
            e.target.src = "defaut.png";
        },
        readMessages: function () {
            axios
                .post("/readUserMessages", {
                    _id: this._id
                })
                .then(response => {
                    this.messages = response.data;
                    this.$emit("mymcevent", this.messages.length);
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
    created: function () {
        this.readMessages();
    }
};
</script>
