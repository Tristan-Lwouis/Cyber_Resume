
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common'; // OBLIGATOIRE pour ngStyle
import { DragDropModule, CdkDragMove } from '@angular/cdk/drag-drop'; //Drag and Drop
import { ViewportLineDirective } from '../../directives/viewport-line.directive';

@Component({
  selector: 'app-loisir-skills',
  //standalone: true, // ?? A quoi ca sert ?
  imports: [CommonModule, DragDropModule, ViewportLineDirective],
  templateUrl: './loisir-skills.component.html',
  styleUrl: './loisir-skills.component.scss'
})

export class LoisirSkillsComponent {
    @Input() title: string = '';
    @Input() titleClass: string = '';
    @Input() skillsZIndex: number = 1;
    @Input() loisirsZIndex: number = 2;
    
    // ID unique pour la directive viewport-line
    componentId: string = 'loisir-skills';
    
    @Output() tabToggle = new EventEmitter<{tab: 'skills' | 'loisirs', isActive: boolean}>();

    @ViewChild(ViewportLineDirective) viewportLineDirective!: ViewportLineDirective;

    constructor(private elementRef: ElementRef) {}

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

  /**
   * Récupère la couleur de la ligne depuis la variable CSS --background-color
   */
  private getLineColor(): string {
    const computedStyle = getComputedStyle(this.elementRef.nativeElement);
    return computedStyle.getPropertyValue('--background-color') || 'black';
  }

  /**
   * Méthode appelée lors du déplacement du composant
   * Utilise la directive pour mettre à jour la ligne
   */
  onDragMoved(event: CdkDragMove): void {
    if (this.viewportLineDirective) {
      // Mettre à jour la couleur de la ligne avec la valeur CSS actuelle
      this.viewportLineDirective.setLineColor(this.getLineColor());
      this.viewportLineDirective.onDragMoved(event);
    }
  }
}