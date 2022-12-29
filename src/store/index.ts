import { createStore } from "vuex";
import tetromino from "./modules/tetromino";
import grid from "./modules/grid";
import game from "./modules/game";
import core from "./modules/core";
import State from "@type/state.interface";

export default createStore<State>({
  modules: {
    core,
    tetromino,
    grid,
    game,
  },
});
