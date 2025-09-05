import { Component, Input, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
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
  @Input() content: string = `
    <h2>2025 → &lt;/now&gt; Formation LDNR :</h2>
    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</span>
    <br>
    <span>----------</span>

    <h2>2020 → 2025 Dessinateur en bureau d'étude :</h2>
    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</span>
    <br>
    <span>----------</span>

    <h2>2020 → 2025 Dessinateur en bureau d'étude :</h2>
    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</span>
    <br>
    <span>----------</span>
  `;

  @ViewChild(ViewportLineDirective) viewportLineDirective!: ViewportLineDirective;

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
}
