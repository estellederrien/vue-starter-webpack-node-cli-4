// THE ASSERTION LIBRARY
import { expect } from "chai";


// THE TESTING LIBRARY
import { mount } from "@vue/test-utils";

// THE COMPONENT THAT I WANT TO TEST
import Profile from "@/components/Profile.vue";

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
// THE COMPONENT HAS VUE PROPS VARIABLES SETTED UP, SO WE RE INJECTING FAKE PROPS VARIABLES TO MAKE IT WORK !
const wrapper = mount(Profile,{
  propsData: {
    id: '5dd300454a1b86001f461f20'
  }
})

// LETS START AND DO SOME TESTS ! - SIMPLY TYPE NPM RUN TEST INSIDE THE CONSOLE AT THE ROOT OF THE APP
describe("Profile test", () => {
  
  // FUNCTIONS PRESENCE
  it("getJobs() to be a function", () => {
    expect(wrapper.vm.getJobs).to.be.a("function");
  });
   it("openMessageModal() to be a function", () => {
    expect(wrapper.vm.openMessageModal).to.be.a("function");
  });
   it("deleteFile() to be a function", () => {
    expect(wrapper.vm.deleteFile).to.be.a("function");
  });
  it("replaceByDefault() to be a function", () => {
    expect(wrapper.vm.replaceByDefault).to.be.a("function");
  });
  it("onUpload() to be a function", () => {
    expect(wrapper.vm.onUpload).to.be.a("function");
  });
   it("onFileUploads() to be a function", () => {
    expect(wrapper.vm.onFileUploads).to.be.a("function");
  });
   it("showModal()  to be a function", () => {
    expect(wrapper.vm.showModal).to.be.a("function");
  });
  it("hideModa()  to be a function", () => {
    expect(wrapper.vm.hideModal).to.be.a("function");
  });
   it("readUser()  to be a function", () => {
    expect(wrapper.vm.readUser).to.be.a("function");
  });
  it("updateUser()  to be a function", () => {
    expect(wrapper.vm.updateUser).to.be.a("function");
  });
  it("deleteUser()  to be a function", () => {
    expect(wrapper.vm.deleteUser).to.be.a("function");
  });
   it("createUser()  to be a function", () => {
    expect(wrapper.vm.createUser).to.be.a("function");
  });
   it("insertUser()  to be a function", () => {
    expect(wrapper.vm.createUser).to.be.a("function");
  });
  it("getActualSession()  to be a function", () => {
    expect(wrapper.vm.getActualSession).to.be.a("function");
  });
 it("getAge()  to be a function", () => {
    expect(wrapper.vm.getAge).to.be.a("function");
  });
  it("insertJob()  to be a function", () => {
    expect(wrapper.vm.insertJob).to.be.a("function");
  });
  it("cancelInsertUser()  to be a function", () => {
    expect(wrapper.vm.cancelInsertUser).to.be.a("function");
  });
  
  // DATA VARIABLES  FORMAT
  it("user is an object", () => {
    expect(wrapper.vm.$data.user).to.be.an("object");
  });
it("jobs is an array", () => {
    expect(wrapper.vm.$data.jobs).to.be.an("array");
  });
  
   // DATA VARIABLES PRESENCE
  it("auth to exist", () => {
    expect(wrapper.vm.$data.auth).to.not.be.undefined;
  });
  it("creationProcess to exist", () => {
    expect(wrapper.vm.$data.creationProcess).to.not.be.undefined;
  });
  it("newJob to exist", () => {
    expect(wrapper.vm.$data.newJob).to.not.be.undefined;
  });
  it("loaded to exist", () => {
    expect(wrapper.vm.$data.loaded).to.not.be.undefined;
  });
  
  
  
    
});