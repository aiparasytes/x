export const x1 = (hydra, isCameraActive) => {
  osc(60, -0.029, 0.038)
      .diff(osc(50, 0.001))
      .modulateScale(noise(1, 0.001)).modulateScale(osc(4,0.03))
      .contrast(1.8)
      .add(src(o0))
      .brightness(-0.01)
      .contrast(0.1)
      .out();
};
  
export const x2 = () => {
  osc(60, -0.029, 0.038)
      .diff(osc(50, 0.001))
      .modulateScale(noise(1, 0.001)).modulateScale(osc(4,0.03))
      .contrast(1.8)
      .add(src(o0))
      .brightness(-0.01)
      .contrast(0.1)
      .out();
};

export const x3 = (hydra, isCameraActive) => {
  voronoi(25,1, 0.1).modulate(osc(3, 0.1)).out();
};
  
  