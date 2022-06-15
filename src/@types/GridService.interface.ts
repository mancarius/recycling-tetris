type grid = unknown[][] | [];
type configs = {
    columns: number;
    rows: number;
  };

interface GridService {
  configs: configs;
  grid: grid;
  initGrid: (configs: configs) => void;
  createGrid: () => grid;
}

export default GridService;
