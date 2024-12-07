class Obstacle {
  constructor(x, y, r, couleur) {
    this.pos = createVector(x, y);
    this.r = r;
    
  }
  show() {
    imageMode(CENTER); // Centre l'image sur la position
    image(obstacleImage, this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    /*fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.r * 2);*/
  }
}

  