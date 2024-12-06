class Obstacle {
  constructor(x, y, r, color) {
    this.pos = createVector(x, y);
    this.r = r;
    this.color = color;
  }

  show() {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}

function creerUnSlider(label, min, max, val, step, posX, posY) {
  let slider = createSlider(min, max, val, step);
  let labelP = createP(label);
  labelP.position(posX, posY);
  labelP.style('color', 'white');

  slider.position(posX + 150, posY + 17);

  let valueSpan = createSpan(slider.value());
  valueSpan.position(posX + 300, posY + 17);
  valueSpan.style('color', 'white');
  valueSpan.html(slider.value());

  slider.input(() => {
    valueSpan.html(slider.value());
  });

  return slider;
}