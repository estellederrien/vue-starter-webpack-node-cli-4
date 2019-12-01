// THE ASSERTION LIBRARY
import { expect } from "chai";

// THE TESTING LIBRARY
import { mount } from "@vue/test-utils";

// THE COMPONENT THAT I WANT TO TEST
import Filters from "@/components/Filters.vue";

// THE EXTERNAL COMPONENTS LINKED TO MY COMPONENT  THAT I NEED TO JOIN
import Vue from 'vue';
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
 import {
    required,
    minLength,
    between
} from "vuelidate/lib/validators";
import Notifications from "vue-notification";
import velocity      from 'velocity-animate'
Vue.use(Notifications, { velocity });


// THE WRAPPER CONTAIN MY MOUNTED COMPONENT, JUST LIKE IN THE REAL LIFE
const wrapper = mount(Filters)

// LETS START AND DO SOME TESTS ! - SIMPLY TYPE NPM RUN TEST INSIDE THE CONSOLE AT THE ROOT OF THE APP
describe("Filters test", () => {
  
  // FUNCTIONS PRESENCE
  it("filterNow() to be a function", () => {
    expect(wrapper.vm.filterNow).to.be.a("function");
  });
  it("initializeFilters() to be a function", () => {
    expect(wrapper.vm.initializeFilters).to.be.a("function");
  });
  // DATA VARIABLES PRESENCE
  it("filtersChanged is an object", () => {
    expect(wrapper.vm.$data.filtersChanged).to.be.an("object");
  });
    
});