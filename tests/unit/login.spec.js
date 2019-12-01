// THE ASSERTION LIBRARY
import { expect } from "chai";

// THE TESTING LIBRARY
import { mount } from "@vue/test-utils";

// THE COMPONENT THAT I WANT TO TEST
import Login from "@/components/Login.vue";

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
const wrapper = mount(Login)

describe("Login test", () => {
  
  it("getAuth() to be a function", () => {
    expect(wrapper.vm.getAuth).to.be.a("function");
  });
    
});