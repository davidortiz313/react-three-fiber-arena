export const state: {
  [key: string]: any;
} = {
  annotationHeight: 0,
  edgeOffset: 0.03,
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

state.getPos = (x: number, y: number) => {
  return [x - 0.5, (0.5 - y) * state.ratio, state.annotationHeight];
};
