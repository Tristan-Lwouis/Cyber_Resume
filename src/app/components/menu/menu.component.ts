import { Component, OnDestroy, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnDestroy {
  
  //#region PROPRIÉTÉS
  // État de chaque menu reçu depuis le composant parent
  // Gestion depuis app.component.ts
  // Structure: [Experience, Formation, Competences, Skills, Loisirs, Portfolio]
  @Input() menuStates: boolean[] = [true, true, true, false, false, false]; 
  
  // Taille du stroke (contour)
  strokeWidth: number = 7;
  //#endregion
  
  // ⚠️ A deplacer dans le composant colorSelector ⚠️
  //#region COULEURS
  // Couleurs (utilisant les variables CSS)
  primaryColor: string = 'rgba(237, 229, 43, 1)'; // Valeur de --primary-color
  backgroundColor: string = '#2196F3'; // Valeur de --link-color
  //#endregion
  
  //#region MÉTHODES DE COULEUR
  // Méthode pour changer la couleur primaire
  setPrimaryColor(color: string): void {
    this.primaryColor = color;
    document.documentElement.style.setProperty('--primary-color', color);
  }
  
  // Méthode pour changer la couleur de fond
  setBackgroundColor(color: string): void {
    this.backgroundColor = color;
    document.documentElement.style.setProperty('--background-color', color);
  }

  // Méthode pour obtenir la couleur primaire actuelle
  getPrimaryColor(): string {
    return getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
  }
  
  // Méthode pour obtenir la couleur de fond actuelle
  getBackgroundColor(): string {
    return getComputedStyle(document.documentElement).getPropertyValue('--background-color').trim();
  }
  //#endregion

  //#region OUTPUTS
  // EventEmitter pour communiquer avec le composant parent
  @Output() menuToggle = new EventEmitter<{index: number, isActive: boolean}>();
  //#endregion
  
  //#region MÉTHODES DE MENU
  // Méthode pour basculer l'état d'un menu
  toggleMenu(index: number): void {
    if (index >= 0 && index < this.menuStates.length) {
      // Émettre l'événement avec l'index et l'état inverse
      this.menuToggle.emit({
        index: index,
        isActive: !this.menuStates[index]
      });
    }
  }
  
  // Méthode pour obtenir la classe CSS selon l'état
  getPathClass(index: number): string {
    if (index >= 0 && index < this.menuStates.length) {
      return this.menuStates[index] ? 'menu-active' : 'menu-inactive';
    }
    return 'menu-inactive';
  }
  
  // Méthode pour obtenir la classe du lien selon l'état
  getLinkClass(index: number): string {
    if (index >= 0 && index < this.menuStates.length) {
      return this.menuStates[index] ? 'link-active' : 'link-inactive';
    }
    return 'link-inactive';
  }
  //#endregion
  
  //#region MÉTHODES DE STROKE
  // Méthode pour obtenir la taille du stroke
  getStrokeWidth(): string {
    return this.strokeWidth.toString();
  }
  
  // Méthode pour changer la taille du stroke
  setStrokeWidth(width: number): void {
    if (width >= 0) {
      this.strokeWidth = width;
    }
  }
  //#endregion
  
  //#region LIFECYCLE
  // Nettoyage des ressources
  ngOnDestroy(): void {
    // Réinitialiser les états
    this.menuStates = [];
    this.strokeWidth = 0;
  }
  //#endregion
}
