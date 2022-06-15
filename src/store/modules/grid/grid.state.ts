import { createGrid } from '@/services/grid.service';
import State from '@/@types/state.interface';

const state = (): State['grid'] => ({
  grid: createGrid({}),
  isFull: false,
  tetrominos: {}
});

export default state;
