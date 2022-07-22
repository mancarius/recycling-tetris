import State from "@type/state.interface";
import { Module } from "vuex";
import actions from "./tetromino.actions";
import getters from "./tetromino.getters";
import mutations from "./tetromino.mutations";
import state from "./tetromino.state";

const tetrominoModule: Module<State["tetromino"], State> = {
  state,
  getters,
  mutations,
  actions,
};

export default tetrominoModule;
