
// THE ASSERTION LIBRARY
import { expect } from "chai";

// THE TESTING LIBRARY
import { mount } from "@vue/test-utils";

// THE COMPONENT THAT I WANT TO TEST
import Users from "@/components/Users.vue";

// THE EXTERNAL COMPONENTS LINKED TO MY COMPONENT  THAT I NEED TO JOIN
global.window = window
global.$ = require('jquery');

// THE WRAPPER CONTAIN MY MOUNTED COMPONENT, JUST LIKE IN THE REAL LIFE
const wrapper = mount(Users);

// LETS START AND DO SOME TESTS ! - SIMPLY TYPE NPM RUN TEST INSIDE THE CONSOLE AT THE ROOT OF THE APP
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
