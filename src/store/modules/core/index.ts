import State from "@type/state.interface";
import { Module } from "vuex";
import mutations from "./core.mutations";
import state from "./core.state";

const coreModule: Module<State["core"], State> = {
  state,
  mutations,
};

export default coreModule;
