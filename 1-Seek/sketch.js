let target, vehicle;
let vehicles = [];
let nbVehicles = 100;
// sliders
let vitesseMaxSlider;
let forceMaxSlider

// la fonction setup est appelée une fois au démarrage du programme par p5.js
function setup() {
  // on crée un canvas de 800px par 800px
  createCanvas(windowWidth, windowHeight);

  // On crée un véhicule à la position (100, 100)
  //vehicle = new Vehicle(100, 100);

  // TODO: créer un tableau de véhicules en global
  // ajouter nb vehicules au tableau dans une boucle
  // avec une position random dans le canvas
  for (let i = 0; i < nbVehicles; i++) {
    let v = new Vehicle(random(width), random(height));
    vehicles.push(v);
  }

  // La cible est un vecteur avec une position aléatoire dans le canvas
  // dirigée par la souris ensuite dans draw()
  //target = createVector(random(width), random(height));

  // Cible qui se déplace aléatoirement, instance Target
  target = new Target(random(width), random(height));

  // Sliders pour régler la vitesse max et la force max
  // On crée le slider et on le positionne
  // Les parametres sont : valeur min, valeur max, 
  // valeur initiale, pas
  vitesseMaxSlider = createSlider(1, 20, 10, 1);
  vitesseMaxSlider.position(920, 10);
  // size en pixels, c'est la largeur du slider
  vitesseMaxSlider.size(80);

  // je crée un label juste devant en X
  let labelVitesseMax = createDiv('Vitesse Max:')
  labelVitesseMax.position(810, 7);
  labelVitesseMax.style('color', 'white');
  labelVitesseMax.style('font-size', '20px');

  // On affiche la valeur du slider à droite du slider
  let valueVitesseMax = createDiv(vitesseMaxSlider.value());
  valueVitesseMax.position(1010, 7);
  valueVitesseMax.style('color', 'white');
  valueVitesseMax.style('font-size', '20px');
  // ecouteur d'événement pour mettre à jour la valeur affichée
  vitesseMaxSlider.input(() => {
    valueVitesseMax.html(vitesseMaxSlider.value());
  });

  // Slider pour régler la force max
  forceMaxSlider = createSlider(0.05, 2, 0.1, 0.05);
  forceMaxSlider.position(920, 40);
  // size en pixels, c'est la largeur du slider
  forceMaxSlider.size(80);

  // je crée un label juste devant en X
  // Ecouteur d'événement pour mettre à jour la valeur affichée
  let labelForceMax = createDiv('Force Max:')
  labelForceMax.position(810, 37);
  labelForceMax.style('color', 'white');
  labelForceMax.style('font-size', '20px');

  // On affiche la valeur du slider à droite du slider
  let valueForceMax = createDiv(forceMaxSlider.value());
  valueForceMax.position(1010, 37);
  valueForceMax.style('color', 'white');
  valueForceMax.style('font-size', '20px');
  // ecouteur d'événement pour mettre à jour la valeur affichée
  forceMaxSlider.input(() => {
    valueForceMax.html(forceMaxSlider.value());
  });

  
}

  // la fonction draw est appelée en boucle par p5.js, 60 fois par seconde par défaut
  // Le canvas est effacé automatiquement avant chaque appel à draw
  function draw() {
    // fond noir pour le canvas
    background("black");

    // A partir de maintenant toutes les formes pleines seront en rouge
    fill("red");
    // pas de contours pour les formes.
    noStroke();

    // mouseX et mouseY sont des variables globales de p5.js, elles correspondent à la position de la souris
    // on les stocke dans un vecteur pour pouvoir les utiliser avec la méthode seek (un peu plus loin)
    // du vehicule
    //target.x = mouseX;
    //target.y = mouseY;

    // Dessine un cercle de rayon 32px à la position de la souris
    // la couleur de remplissage est rouge car on a appelé fill(255, 0, 0) plus haut
    // pas de contours car on a appelé noStroke() plus haut
    //circle(target.x, target.y, 32);

    // On dessine la cible instance de Target. C'est un Vehicle
    // donc elle a une position, une vitesse, une accélération
    target.show();
    target.update();
    target.edges();

    vehicles.forEach(vehicle => {
      // On change la vitesse max du véhicule avec la 
      // valeur du slider
      vehicle.maxSpeed = vitesseMaxSlider.value();
      // On change la force max du véhicule avec la 
      // valeur du slider
      vehicle.maxForce = forceMaxSlider.value();

      // je déplace et dessine le véhicule
      vehicle.applyBehaviors(target.pos);
      vehicle.update();

      // Si le véhicule a touché la cible (distance < 10px)
      // il reapparait aléatoirement dans le canvas
    let d = p5.Vector.dist(vehicle.pos, target.pos);
    if (d < 10) {
      vehicle.pos = createVector(random(width), random(height));
    }
    // Si le vehicule sort de l'écran
    // TODO : appeler la méthode edges() du véhicule
    vehicle.edges();

    // On dessine le véhicule
    vehicle.show();
    });
  };

