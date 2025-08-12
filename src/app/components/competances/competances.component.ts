import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop'; //Drag and Drop

@Component({
  selector: 'app-competances',
  imports: [CommonModule,DragDropModule],
  templateUrl: './competances.component.html',
  styleUrl: './competances.component.scss'
})
export class CompetancesComponent {
  // Objet pour stocker la rotation de chaque flèche
  arrowRotation: { [key: string]: number } = {
    javascript: 0,
    html: 0
  };
  // Objet pour stocker l'état de chaque langage
  open: { [key: string]: boolean } = {
    javascript: false,
    html: false
  };
  // Propriété pour la hauteur du path SVG
  pathHeight: number = 330;

  // Méthode appelée quand on clique sur la flèche
  rotateArrow(language: string) {
    // Ajoute 90 degrés à la rotation actuelle
    this.arrowRotation[language] += 90;
    
    // Optionnel : garder la rotation entre 0 et 360 degrés
    if (this.arrowRotation[language] > 90) {
      this.arrowRotation[language] = 0;
      this.open[language] = false;
      // console.log("close")
    } else {
      this.open[language] = true;
      // console.log("open")
    }
    
    // Calculer la hauteur en fonction de l'état de toutes les flèches
    this.updatePathHeight();
  }

  // Méthode pour mettre à jour la hauteur du path
  updatePathHeight() {
    // Si au moins une flèche est ouverte, garder la hauteur à 600
    const hasAnyOpen = Object.values(this.open).some(isOpen => isOpen);
    this.pathHeight = hasAnyOpen ? 600 : 311.726;
  }

  // Méthode pour générer le path SVG avec la hauteur dynamique
  getPathD(): string {
    return `M12.0713 ${this.pathHeight}V3H214.521L261.938 40.7647H578V${this.pathHeight}H12.0713Z`;
  }
}
