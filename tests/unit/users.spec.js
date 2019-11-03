import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Users from "@/components/Users.vue";

const wrapper = shallowMount(Users);

describe("Users test", () => {
  it("Displays nice hello message", () => {
    expect(wrapper.vm.$data.msg).to.equal("Welcome to Crypto Info");
  });
  it("users model is an array", () => {
    expect(wrapper.vm.$data.users).to.be.an("array");
  });
  it("getUsers() to be a function", () => {
    expect(wrapper.vm.$methods.getUsers()).to.be.a("function");
  });
});
