
// THE ASSERTION LIBRARY
import { expect } from "chai";

// THE TESTING LIBRARY
import { mount } from "@vue/test-utils";

// THE COMPONENT THAT I WANT TO TEST
import Users from "@/components/Users.vue";

// THE EXTERNAL COMPONENTS LINKED TO MY COMPONENT  THAT I NEED TO JOIN
global.window = window
global.$ = require('jquery');

const wrapper = shallowMount(Users);

describe("Users test", () => {
  
  it("Displays nice hello message", () => {
    expect(wrapper.vm.$data.msg).to.equal("Welcome to Crypto Info");
  });

  it("users model is an array", () => {
    expect(wrapper.vm.$data.users).to.be.an("array");
  });
  it("getUsers() to be a function", () => {
    expect(wrapper.vm.getUsers).to.be.a("function");
  });
  
   
});
