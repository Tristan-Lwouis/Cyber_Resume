
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // OBLIGATOIRE pour ngStyle

@Component({
  selector: 'app-user-info-card',
  //standalone: true, // ?? A quoi ca sert ?
  imports: [CommonModule],
  templateUrl: './user-info-card.component.html',
  styleUrl: './user-info-card.component.scss'
})

export class UserInfoCardComponent {
    @Input() title: string = '';
    @Input() titleClass: string = '';

  firstTabZ = 2;
  secondTabZ = 1;

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