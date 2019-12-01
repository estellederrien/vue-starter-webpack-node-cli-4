import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Register from "@/components/Register.vue";

const wrapper = shallowMount(Register);

describe("Register tests", () => {
  
  // TESTING DATA
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
	it("Should display a name input", () => {
		expect(wrapper.vm.$el.getElementById('nom') !== null).to.be.true
	}); 
  
   // it("should Button register fire function", () => {
     // expect(wrapper.html()).toContain('<span class="count">0</span>')
   // });
});
