
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // OBLIGATOIRE pour ngStyle
import { DragDropModule } from '@angular/cdk/drag-drop'; //Drag and Drop

@Component({
  selector: 'app-user-info-card',
  //standalone: true, // ?? A quoi ca sert ?
  imports: [CommonModule, DragDropModule],
  templateUrl: './user-info-card.component.html',
  styleUrl: './user-info-card.component.scss'
})

export class UserInfoCardComponent {
    @Input() title: string = '';
    @Input() titleClass: string = '';

  firstTabZ = 1;
  secondTabZ = 2;

  showFirstTab() {
    this.firstTabZ = 2; // 2 pour être au-dessus de l'autre
    this.secondTabZ = 1; // 1 pour être en dessous de l'autre
    console.log("Appuie sur le premier onglet")
  }

  showSecondTab() {
    this.firstTabZ = 1; // 1 pour être en dessous de l'autre
    this.secondTabZ = 2; // 2 pour être au-dessus de l'autre
    console.log("Appuie sur le deuxieme onglet")
  }
}