// THE ASSERTION LIBRARY
import { expect } from "chai";

// THE TESTING LIBRARY
import { mount } from "@vue/test-utils";

// THE COMPONENT THAT I WANT TO TEST
import Groups from "@/components/Groups.vue";

// THE EXTERNAL COMPONENTS LINKED TO MY COMPONENT  THAT I NEED TO JOIN
import Vue from "vue";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
import { required, minLength, between } from "vuelidate/lib/validators";
import Notifications from "vue-notification";
import velocity from "velocity-animate";
Vue.use(Notifications, { velocity });
import Multiselect from "vue-multiselect";
// THE WRAPPER CONTAIN MY MOUNTED COMPONENT, JUST LIKE IN THE REAL LIFE
// THE COMPONENT HAS VUE PROPS VARIABLES SETTED UP, SO WE RE INJECTING FAKE PROPS VARIABLES TO MAKE IT WORK !
const wrapper = mount(Groups);

// LETS START AND DO SOME TESTS ! - SIMPLY TYPE NPM RUN TEST INSIDE THE CONSOLE AT THE ROOT OF THE APP
describe("Groups tests ", () => {
  // FUNCTIONS PRESENCE
  it("createGroup() to be a function", () => {
    expect(wrapper.vm.createGroup).to.be.a("function");
  });
  it("readGroup() to be a function", () => {
    expect(wrapper.vm.readGroup).to.be.a("function");
  });
  it("updateGroup() to be a function", () => {
    expect(wrapper.vm.updateGroup).to.be.a("function");
  });
  it("deleteGroup() to be a function", () => {
    expect(wrapper.vm.deleteGroup).to.be.a("function");
  });
  it("readGroups() to be a function", () => {
    expect(wrapper.vm.readGroups).to.be.a("function");
  });

  // DATA VARIABLES  FORMAT
  it("group is an object", () => {
    expect(wrapper.vm.$data.group).to.be.an("object");
  });
  it("users is an array", () => {
    expect(wrapper.vm.$data.users).to.be.an("array");
  });
  it("value to be a string", () => {
    expect(wrapper.vm.$data.value).to.be.an("string");
  });

  // DATA VARIABLES PRESENCE
  //   it("auth to exist", () => {
  //     expect(wrapper.vm.$data.auth).to.not.be.undefined;
  //   });
  //   it("creationProcess to exist", () => {
  //     expect(wrapper.vm.$data.creationProcess).to.not.be.undefined;
  //   });
  //   it("newJob to exist", () => {
  //     expect(wrapper.vm.$data.newJob).to.not.be.undefined;
  //   });
  //   it("loaded to exist", () => {
  //     expect(wrapper.vm.$data.loaded).to.not.be.undefined;
  //   });
});
