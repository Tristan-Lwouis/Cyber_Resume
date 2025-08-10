
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // OBLIGATOIRE pour ngStyle
import { DragDropModule } from '@angular/cdk/drag-drop'; //Drag and Drop

@Component({
  selector: 'app-loisir-skills',
  //standalone: true, // ?? A quoi ca sert ?
  imports: [CommonModule, DragDropModule],
  templateUrl: './loisir-skills.component.html',
  styleUrl: './loisir-skills.component.scss'
})

export class LoisirSkillsComponent {
    @Input() title: string = '';
    @Input() titleClass: string = '';
    @Input() skillsZIndex: number = 1;
    @Input() loisirsZIndex: number = 2;
    
    @Output() tabToggle = new EventEmitter<{tab: 'skills' | 'loisirs', isActive: boolean}>();

  showFirstTab() {
    // Émettre l'événement pour activer/désactiver l'onglet Loisirs
    this.tabToggle.emit({tab: 'loisirs', isActive: true});
    console.log("Appuie sur le premier onglet (Loisirs)")
  }

  showSecondTab() {
    // Émettre l'événement pour activer/désactiver l'onglet Skills
    this.tabToggle.emit({tab: 'skills', isActive: true});
    console.log("Appuie sur le deuxieme onglet (Skills)")
  }
}