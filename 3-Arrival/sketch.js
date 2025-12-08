let nbVehicules = 1;
let target;
let vehicle;
let vehicles = [];

// Appelée avant de démarrer l'animation
function preload() {
  // en général on charge des images, des fontes de caractères etc.
  font = loadFont('./assets/inconsolata.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // On crée un véhicule à la position (100, 100)
  vehicle = new Vehicle(100, 100);

  // La cible, ce sera la position de la souris
  target = createVector(random(width), random(height));

  
  // on creer des vehicules
  for (let i = 0; i < nbVehicules; i++) {
    vehicles.push(new Vehicle(random(width), random(height)));
  }


}

// appelée 60 fois par seconde
function draw() {
  // couleur pour effacer l'écran
  background(0);
  // pour effet psychedelique
  //background(0, 0, 0, 10);

  // Cible qui suit la souris, cercle rouge de rayon 32
  target.x = mouseX;
  target.y = mouseY;

  // dessin de la cible
  push();
  fill(255, 0, 0);
  noStroke();
  ellipse(target.x, target.y, 32);
  pop();

  vehicles.forEach((vehicle, index) => {
    // si on a affaire au premier véhicule
    // alors il suit la souris (target)
    let steeringForce;


    steeringForce = vehicle.arrive(target);

    vehicle.applyForce(steeringForce);
    vehicle.update();
    vehicle.show();
  })
}


function keyPressed() {
  if (key === 'd') {
    Vehicle.debug = !Vehicle.debug;
  } 
}