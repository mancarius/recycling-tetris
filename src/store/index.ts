import { createStore } from "vuex";
import tetromino from "./modules/tetromino";
import grid from "./modules/grid";
import game from "./modules/game";

export default createStore({
  modules: {
    tetromino,
    grid,
    game,
  },
});
