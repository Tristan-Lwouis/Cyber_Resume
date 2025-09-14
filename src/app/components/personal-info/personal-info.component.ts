import { Component, Input, OnInit, HostListener, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { DragDropModule, CdkDragMove } from '@angular/cdk/drag-drop'; //Drag and Drop
import { ViewportLineDirective } from '../../directives/viewport-line.directive';


@Component({
  selector: 'app-personal-info',
  imports: [CommonModule, DragDropModule, ViewportLineDirective],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss'
})
export class PersonalInfoComponent implements OnInit {
  @Input() tabTitle: string = 'EXPER1ENCE';
  @Input() componentId: string = 'experience'; // ID unique du composant
  /**
   * Pourcentage de la largeur de l'écran pour calculer la distance du point intermédiaire de la ligne.
   * Cette valeur détermine à quelle distance du composant le point intermédiaire sera placé.
   * Par défaut : 12% de la largeur de l'écran.
   * Exemple : distancePercentage = 15 signifie que le point intermédiaire sera à 15% de window.innerWidth du composant.
   */
  @Input() distancePercentage: number = 12;
  @Input() content: string = '';

  @ViewChild(ViewportLineDirective) viewportLineDirective!: ViewportLineDirective;
  
  // EventEmitter pour communiquer avec le composant parent
  @Output() closeComponent = new EventEmitter<void>();

  constructor(
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    // La directive gère automatiquement l'initialisation
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

  /**
   * Méthode appelée quand l'utilisateur clique sur le bouton "X"
   * Émet un événement pour fermer le composant
   */
  onCloseClick(): void {
    this.closeComponent.emit();
  }
}
