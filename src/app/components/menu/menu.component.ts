import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  // État de chaque menu (false = off, true = on)
  menuStates: boolean[] = [false, false, false, false, false];
  
  // Taille du stroke (contour)
  strokeWidth: number = 5;
  
  // Couleurs (correspondant aux variables SCSS)
  primaryColor: string = 'rgba(237, 229, 43, 1)'; // $primary-color
  backgroundColor: string = '#000000'; // $background-color
  
  // Méthode pour basculer l'état d'un menu
  toggleMenu(index: number): void {
    this.menuStates[index] = !this.menuStates[index];
  }
  
  // Méthode pour obtenir la classe CSS selon l'état
  getPathClass(index: number): string {
    return this.menuStates[index] ? 'menu-active' : 'menu-inactive';
  }
  
  // Méthode pour obtenir la classe du lien selon l'état
  getLinkClass(index: number): string {
    return this.menuStates[index] ? 'link-active' : 'link-inactive';
  }
  
  // Méthode pour obtenir la taille du stroke
  getStrokeWidth(): string {
    return this.strokeWidth.toString();
  }
  
  // Méthode pour changer la taille du stroke
  setStrokeWidth(width: number): void {
    this.strokeWidth = width;
  }
}
