// THE ASSERTION LIBRARY
import { expect } from "chai";

// THE TESTING LIBRARY
import { mount } from "@vue/test-utils";

// THE COMPONENT THAT I WANT TO TEST
import Message from "@/components/Message.vue";

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
// THE COMPONENT HAS PROPS, SO WE RE INJECTING FAKE PROPS TO MAKE IT WORK !
const wrapper = mount(Message,{
  propsData: {
    user: {"nom":"Andre"}
  }
})

// LETS START AND DO SOME TESTS ! - SIMPLY TYPE NPM RUN TEST INSIDE THE CONSOLE AT THE ROOT OF THE APP
describe("Message test", () => {
  
  // FUNCTIONS PRESENCE
  it("getUsers() to be a function", () => {
    expect(wrapper.vm.getUsers).to.be.a("function");
  });
  it("insertMessage() to be a function", () => {
    expect(wrapper.vm.insertMessage).to.be.a("function");
  });
  // DATA VARIABLES PRESENCE
  it("message is an object", () => {
    expect(wrapper.vm.$data.message).to.be.an("object");
  });
   it("users is an array", () => {
    expect(wrapper.vm.$data.users).to.be.an("array");
  });
    
});