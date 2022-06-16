import { Vector3 } from "three";

export const state: {
  [key: string]: any;
} = {
  annotationHeight: 0.01,
  edgeOffset: 0.04,
  edgeGap: 0.01,
  cornerLength: 0.04,
  subgrades: {
    center: ["vertical", "horizontal"],
    edge: ["wear", "misshaped", "whitening"],
    corner: ["rounding", "wear", "whitening", "soft", "damage", "bent"],
    surface: ["spotting", "scratch", "print-lines", "bent", "dent", "crease"],
    auto: [],
  },
  controls: null,
  screenSize: [window.innerWidth, window.innerHeight],
};

// state.getPos = (x: number, y: number) => {
//   return [x - 0.5, (0.5 - y) * state.ratio, state.annotationHeight];
// };

state.getPos = (x: number, y: number) => {
  return { x: 1 / 12 + (10 / 12) * x, y: 11 / 12 - (10 / 12) * y };
};

state._getPos = (x: number, y: number) => {
  return new Vector3(x - 0.5, (0.5 - y) * state.ratio, state.annotationHeight);
};
