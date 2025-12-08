let vehicles = [];
let imageFusee;
let debugCheckbox;

function preload() {
  // on charge une image de fusée pour le vaisseau
  imageFusee = loadImage('./assets/vehicule.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  const nbVehicles = 1;
  for(let i=0; i < nbVehicles; i++) {
    let vehicle = new Vehicle(100, 100, imageFusee);
    vehicles.push(vehicle);
  }

  // On cree des sliders pour régler les paramètres
  //creerSlidersPourProprietesVehicules();

  //TODO : creerSliderPourNombreDeVehicules(nbVehicles);
  //creerSliderPourNombreDeVehicules(nbVehicles);

  //TODO : 
  //creerSliderPourLongueurCheminDerriereVehicules(20);
}



// appelée 60 fois par seconde
function draw() {
  background(0);
  //background(0, 0, 0, 20);

  vehicles.forEach(vehicle => {
    vehicle.wander();

    vehicle.update();
    vehicle.show();
    vehicle.edges();
  });
}

function keyPressed() {
  if (key === 'd') {
    Vehicle.debug = !Vehicle.debug;
    // changer la checkbox, elle doit être checkée si debug est true
    debugCheckbox.checked(Vehicle.debug);
  }
}
