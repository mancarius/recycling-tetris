import State from "@type/state.interface";
import { Module } from "vuex";
import actions from "./game.actions";
import getters from "./game.getters";
import mutations from "./game.mutations";
import state from "./game.state";

const gridModule: Module<State["game"], State> = {
  state,
  getters,
  mutations,
  actions,
};

export default gridModule;
