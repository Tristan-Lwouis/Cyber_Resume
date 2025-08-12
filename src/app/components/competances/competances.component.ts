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
  // Propriété pour suivre l'angle de rotation actuel
  arrowRotation: number = 0;
  open: boolean = false;

  // Méthode appelée quand on clique sur la flèche
  rotateArrow() {
    // Ajoute 90 degrés à la rotation actuelle
    this.arrowRotation += 90;
    
    // Optionnel : garder la rotation entre 0 et 360 degrés
    if (this.arrowRotation > 90) {
      this.arrowRotation = 0;
      this.open = false;
      // console.log("close")
    } else {
      this.open = true;
      // console.log("open")
    }
  }
}
