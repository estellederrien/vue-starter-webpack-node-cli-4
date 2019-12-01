
// THE ASSERTION LIBRARY
import { expect } from "chai";

// THE TESTING LIBRARY
import { mount } from "@vue/test-utils";

// THE COMPONENT THAT I WANT TO TEST
import Register from "@/components/Register.vue";

// THE EXTERNAL COMPONENTS LINKED TO MY COMPONENT  THAT I NEED TO JOIN
import Vue from 'vue';
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
 import {
    required,
    minLength,
    between
} from "vuelidate/lib/validators";


// THE WRAPPER CONTAIN MY MOUNTED COMPONENT, JUST LIKE IN THE REAL LIFE
const wrapper = mount(Register)

describe("Register tests", () => {
  
  // TESTING DATA VARIABLES 
  it("User model is an object", () => {
    expect(wrapper.vm.$data.user).to.be.an("object");
  });
   it("register() is a a function", () => {
    expect(wrapper.vm.register).to.be.a("function");
  });
  
  // TESTING HTML INPUT PRESENCE
  it("Should display a Pwd input", () => {
		expect(wrapper.vm.$el.querySelector("input[type='password']") !== null).to.be.true
	});

   it("Should display an Email input", () => {
		expect(wrapper.vm.$el.querySelector("input[type='email']") !== null).to.be.true
	});
	// it("Should display a name input", () => {
		// expect(wrapper.vm.$el.getElementById('nom') !== null).to.be.true
	// }); 
  
   // it("should Button register fire function", () => {
     // expect(wrapper.html()).toContain('<span class="count">0</span>')
   // });
});
