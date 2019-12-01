// THE ASSERTION LIBRARY
import { expect } from "chai";

// THE TESTING LIBRARY
import { mount } from "@vue/test-utils";

// THE COMPONENT THAT I WANT TO TEST
import Messages from "@/components/Messages.vue";

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
const wrapper = mount(Messages,{
  propsData: {
    _id: '5dd300454a1b86001f461f20'
  }
})

describe("Messages list test", () => {
  
  // FUNCTIONS PRESENCE
  it("getMessages() to be a function", () => {
    expect(wrapper.vm.getMessages).to.be.a("function");
  });
 
  // DATA VARIABLES  PRESENCE
  it("message is an array", () => {
    expect(wrapper.vm.$data.messages).to.be.an("array");
  });

    
});