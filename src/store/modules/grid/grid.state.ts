import State from "@type/state.interface";

const state = (): State["grid"] => ({
  grid: [],
  isFull: false,
  tetrominos: [],
});

export default state;
