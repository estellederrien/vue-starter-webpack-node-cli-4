// Importing The testing library 
import App from '@/App';
import { expect } from "chai";
import { mount } from '@vue/test-utils'
import $notify from 'vue-notification';
global.$notify = $notify;


// Importing  The component I need to test
import Login from "@/components/Login.vue";

// Mounting the component as in real life 
const wrapper = mount(Login);



describe("Login test", () => {
  
  it("getAuth() to be a function", () => {
    expect(wrapper.vm.getAuth).to.be.a("function");
  });
    
});