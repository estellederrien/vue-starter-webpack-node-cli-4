<template>
  <div class="container-fluid">
    <vue-cal
      style="height: 800px"
      :events="events"
      locale="fr"
      hide-weekends
      :disable-views="['years', 'year']"
      events-on-month-view="short"
      editable-events
      resize-x
    ></vue-cal>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/i18n/fr.js";
import "vue-cal/dist/vuecal.css";

export default {
  components: {
    VueCal
  },

  data: () => ({
    events: [
      {
        start: "2019-12-24 09:00",
        end: "2019-12-24 12:00",
        title: "Need to go shopping",
        content: '<i class="fa fa-user">shopping_cart</i>',
        class: "leisure"
      }
    ]
  }),
  name: "Calendar",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style >
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

/* Different color for different event types. */
.vuecal__event.leisure {
  background-color: rgba(253, 156, 66, 0.9);
  border: 1px solid rgb(233, 136, 46);
  color: #fff;
}
.vuecal__event.sport {
  background-color: rgba(255, 102, 102, 0.9);
  border: 1px solid rgb(235, 82, 82);
  color: #fff;
}
</style>
