import State from '@/@types/state.interface';
import { Module } from 'vuex';
import actions from './grid.actions';
import getters from './grid.getters';
import mutations from './grid.mutations';
import state from "./grid.state";

const gridModule: Module<State["grid"], State> = {
  state,
  getters,
  mutations,
  actions,
};

export default gridModule;
