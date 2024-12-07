class Obstacle {
  constructor(x, y, r, color) {
    this.pos = createVector(x, y);
    this.r = r;
    this.vel = p5.Vector.random2D().mult(random(0.5, 2)); // Vitesse aléatoire pour le déplacement
    //this.color = color;
  }

  update() {
    // Déplace l'obstacle selon sa vitesse
    this.pos.add(this.vel);

    // Si l'obstacle sort des limites de l'écran, il revient de l'autre côté
    if (this.pos.x > width + this.r) this.pos.x = -this.r;
    if (this.pos.x < -this.r) this.pos.x = width + this.r;
    if (this.pos.y > height + this.r) this.pos.y = -this.r;
    if (this.pos.y < -this.r) this.pos.y = height + this.r;
  }

  show() {
    imageMode(CENTER); // Centre l'image sur la position
    image(obstacleImage, this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    // Si vous utilisez une couleur, vous pouvez décommenter la ligne suivante pour un cercle coloré
    //fill(this.color);
    //ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
