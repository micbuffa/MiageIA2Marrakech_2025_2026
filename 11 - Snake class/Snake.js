class Snake extends Vehicle {
    constructor(x, y, longueur, taille, couleur) {
        super(x, y);
        this.anneaux = [];
        this.r = taille;
        this.couleur = couleur;
        this.maxSpeed = 5;


        this.distanceCercle = 400

        this.rayonZoneDeFreinage = this.r * 2;

        // On initialise les anneaux du serpent
        for (let i = 0; i < longueur; i++) {
            let anneau = new Vehicle(x, y);
            anneau.r = this.r * 0.8; // Les anneaux sont un peu plus petits que la tête
            this.anneaux.push(anneau);
        }

        this.boundariesWeight = 10;
        this.wanderWeight = 1;
        this.seekWeight = 0.2;
    }

    applyBehaviors(target) {
        let seekForce = this.seek(target);
        let wanderForce = this.wander();
        let boundaryForce = this.boundaries(this.boundariesX, this.boundariesY, this.boundariesWidth, this.boundariesHeight, this.boundariesDistance);

        // Applique les forces avec des poids spécifiques
        wanderForce.mult(this.wanderWeight);
        boundaryForce.mult(this.boundariesWeight);
        seekForce.mult(this.seekWeight);

        // on applique les forces à la tête du serpent
        this.applyForce(boundaryForce);
        this.applyForce(wanderForce);
        this.applyForce(seekForce);
        // Met à jour la position de la tête
        this.update();

        // Met à jour la position des anneaux
        for (let i = 0; i < this.anneaux.length; i++) {
            // chaque annea fait arrive sur la position de l'élément précédent
            let cible = (i === 0) ? this.pos : this.anneaux[i - 1].pos;
            let anneau = this.anneaux[i];
            let arriveForce = anneau.arrive(cible, this.r / 2); // distance de 15 pour éviter le chevauchement
            anneau.applyForce(arriveForce);
            anneau.update();
        }
    }

    show() {
        // draw the head of the snake
        stroke(255, 0, 0);
        strokeWeight(2);
        fill(255, 0, 0);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        ellipse(0, 0, this.r * 2);

        // draw eyes radius : this.r / 2
        fill(0);
        ellipse(this.r / 2, -this.r / 2, this.r / 3);
        ellipse(this.r / 2, this.r / 2, this.r / 3);
        pop();

        // draw the rings of the snake
        for (let i = 0; i < this.anneaux.length; i++) {
            let anneau = this.anneaux[i];
            let anneauPrecedent;
            // on peut aussi dessiner une ligne entre chaque anneau pour mieux visualiser le serpent
            if (i > 0) {
                anneauPrecedent = this.anneaux[i - 1];
            } else {
                anneauPrecedent = this;
            }
            // on dessine une ligne transparente avec une couleur
            // qui varie en fonction de l'index de l'anneau
            // largeur = deux fois le rayon de l'anneau
            push();
            noFill();
            stroke(255, 0, 0, map(i, 0, this.anneaux.length, 50, 200));
            strokeWeight(anneau.r * 2);
            line(anneau.pos.x, anneau.pos.y,
                anneauPrecedent.pos.x, anneauPrecedent.pos.y);
            pop();

            // on dessine l'anneau
            stroke(0, 255, 0);
            strokeWeight(2);
            fill(this.couleur);
            push();
            translate(anneau.pos.x, anneau.pos.y);
            rotate(anneau.vel.heading());
            ellipse(0, 0, anneau.r * 2);
            pop();
        }
    }
}   