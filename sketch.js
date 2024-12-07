// Flocking
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM

// Equivalent du tableau de véhicules dans les autres exemples
let flock = [];
let fishImage;
let requinImage;
let obstacles = [];
let alignSlider, cohesionSlider, separationSlider;
let labelNbBoids;

let target;
let requin;

function preload() {
  // On charge une image de poisson
  fishImage = loadImage('assets/fish.png');
  requinImage = loadImage('assets/shark.png');
  oceanImage = loadImage('assets/ocean.jpg');
  obstacleImage = loadImage('assets/rock.png');
}


function setup() {
  
  createCanvas(1600, 800);
   
  
  // Quelques sliders pour régler les "poids" des trois comportements de flocking
  // flocking en anglais c'est "se rassembler"
  // rappel : tableauDesVehicules, min max val step posX posY propriété
  const posYSliderDeDepart = 10;
  creerUnSlider("Poids alignment", flock, 0, 2, 1.5, 0.1, 10, posYSliderDeDepart, "alignWeight");
  creerUnSlider("Poids cohesion", flock, 0, 2, 1, 0.1, 10, posYSliderDeDepart+30, "cohesionWeight");
  creerUnSlider("Poids séparation", flock, 0, 15, 3, 0.1, 10, posYSliderDeDepart+60,"separationWeight");
  creerUnSlider("Poids boundaries", flock, 0, 15, 10, 1, 10, posYSliderDeDepart+90,"boundariesWeight");
  
  creerUnSlider("Rayon des boids", flock, 4, 40, 6, 1, 10, posYSliderDeDepart+120,"r");
  creerUnSlider("Perception radius", flock, 15, 60, 25, 1, 10, posYSliderDeDepart+150,"perceptionRadius");

  // On créer les "boids". Un boid en anglais signifie "un oiseau" ou "un poisson"
  // Dans cet exemple c'est l'équivalent d'un véhicule dans les autres exemples
  for (let i = 0; i < 200; i++) {
    const b = new Boid(random(width), random(height), fishImage);
    b.r = random(8, 40);
    flock.push(b);
  }

  // Créer un label avec le nombre de boids présents à l'écran
   labelNbBoids = createP("Nombre de boids : " + flock.length);
  // couleur blanche
  labelNbBoids.style('color', 'white');
  labelNbBoids.position(10, posYSliderDeDepart+180);

  // target qui suit la souris
  target = createVector(mouseX, mouseY);
  target.r = 50;

  // requin prédateur
  requin = new Boid(width/2, height/2, requinImage);
  requin.r = 100;
  requin.maxSpeed = 7;
  requin.maxForce = 0.9;
}

function creerUnSlider(label, tabVehicules, min, max, val, step, posX, posY, propriete) {
  let slider = createSlider(min, max, val, step);
  
  let labelP = createP(label);
  labelP.position(posX, posY);
  labelP.style('color', 'white');

  slider.position(posX + 150, posY + 17);

  let valueSpan = createSpan(slider.value());
  valueSpan.position(posX + 300, posY+17);
  valueSpan.style('color', 'white');
  valueSpan.html(slider.value());

  slider.input(() => {
    valueSpan.html(slider.value());
    tabVehicules.forEach(vehicle => {
      vehicle[propriete] = slider.value();
    });
  });

  return slider;
}

function draw() {
  image(oceanImage, 800, 400, width, height);

  // mettre à jour le nombre de boids
  labelNbBoids.html("Nombre de boids : " + flock.length);

  // Dessiner la cible qui suit la souris
  target.x = mouseX;
  target.y = mouseY;
  fill("lightgreen");
  noStroke();
  ellipse(target.x, target.y, target.r, target.r);

  // Dessiner les boids
  for (let boid of flock) {
    boid.flock(flock);
    boid.followWithTargetRadius(target);
    boid.update();
    boid.show();   
  }

  // Mettre à jour et afficher les obstacles
  for (let obstacle of obstacles) {
    obstacle.update();  // Mise à jour du mouvement des obstacles
    obstacle.show();    // Affichage des obstacles
  }

  // Mettre à jour et afficher les poissons (boids)
  for (let boid of flock) {
    boid.followWithTargetRadius(target); // Les poissons fuient la souris
    let avoidForce = boid.avoid(obstacles); // Les poissons évitent les obstacles
    avoidForce.mult(10);
    boid.applyForce(avoidForce);

    boid.flock(flock); // Comportement de groupe
    boid.update();
    boid.show();
  }

  // Ajouter un obstacle en cliquant
  function mousePressed() {
    obstacles.push(new Obstacle(mouseX, mouseY, random(20, 100), "green"));
  }

  // Dessin du requin
  let wanderForce = requin.wander();
  wanderForce.mult(1);
  requin.applyForce(wanderForce);

  // calcul du poisson le plus proche
  let seekForce;
  let rayonDeDetection = 70;

  noFill();
  stroke("yellow");
  ellipse(requin.pos.x, requin.pos.y, rayonDeDetection*2, rayonDeDetection*2);

  let closest = requin.getVehiculeLePlusProche(flock);

  if (closest) {
    let d = p5.Vector.dist(requin.pos, closest.pos);
    if (d < rayonDeDetection) {
      seekForce = requin.seek(closest.pos);
      seekForce.mult(7);
      requin.applyForce(seekForce);
    }
    if (d < 5) {
      let index = flock.indexOf(closest);
      flock.splice(index, 1);
    }
  }

  requin.edges();
  requin.update();
  requin.show();
}

function mouseDragged() {
  const b = new Boid(mouseX, mouseY, fishImage);
  
  b.r = random(8, 40);

  flock.push(b);


}
function mousePressed() {
  // TODO : ajouter un obstacle de taille aléatoire à la position de la souris
  obstacles.push(new Obstacle(mouseX, mouseY, random(20, 100), ));
}

function keyPressed() {
 if (key === 'd') {
    Boid.debug = !Boid.debug;
  } else if (key === 'r') {
    // On donne une taille différente à chaque boid
    flock.forEach(b => {
      b.r = random(8, 40);
    });
  }
}

