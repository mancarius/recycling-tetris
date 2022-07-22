import State from "@type/state.interface";
import { COLORS, SHAPES } from "@config";

const state = (): State["tetromino"] => ({
  position: { x: 4, y: 0 },
  shape: SHAPES[1],
  rotation: 0,
  color: COLORS[1],
  frozen: false,
  tid: null,
});

export default state;
