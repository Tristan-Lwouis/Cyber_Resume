import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop'; //Drag and Drop

// Interface pour définir la structure d'un langage
interface Language {
  id: string;
  name: string;
  icon: string;
  progressWidth: number; // Largeur de la barre de progression (0-100)
  skills: string[]; // Liste des compétences
}

@Component({
  selector: 'app-competances',
  imports: [CommonModule,DragDropModule],
  templateUrl: './competances.component.html',
  styleUrl: './competances.component.scss'
})
export class CompetancesComponent {
  // Données des langages - facilement modifiables et extensibles
  languages: Language[] = [
    {
      id: 'javascript',
      name: 'JAVASCRIPT',
      icon: '/assets/media/icons/LANG_logo-javascript.svg',
      progressWidth: 85, // 85% de largeur
      skills: [
        'Programmation modulaire',
        'Gestion des structures',
        'Programmation asynchrone',
        'Manipulation du DOM',
        'Frameworks modernes'
      ]
    },
    {
      id: 'html',
      name: 'HTML',
      icon: '/assets/media/icons/LANG_html-5.svg',
      progressWidth: 90, // 90% de largeur
      skills: [
        'Structure sémantique',
        'Accessibilité web',
        'Formulaires et validation'
      ]
    },
    {
      id: 'css',
      name: 'CSS',
      icon: '/assets/media/icons/LANG_css.svg',
      progressWidth: 75, // 75% de largeur
      skills: [
        'Layout Flexbox/Grid',
        'Animations et transitions',
        'Responsive design',
        'Préprocesseurs (Sass)'
      ]
    },
    {
      id: 'python',
      name: 'PYTHON',
      icon: '/assets/media/icons/LANG_python.svg',
      progressWidth: 70,
      skills: [
        'Programmation orientée objet',
        'Analyse de données',
        'Automatisation'
      ]
    }
  ];

  // Objet pour stocker la rotation de chaque flèche
  arrowRotation: { [key: string]: number } = {};
  
  // Objet pour stocker l'état de chaque langage
  open: { [key: string]: boolean } = {};
  
  // Propriété pour la hauteur du path SVG
  pathHeight: number = 330;

  constructor() {
    // Initialiser les états pour chaque langage
    this.languages.forEach(lang => {
      this.arrowRotation[lang.id] = 0;
      this.open[lang.id] = false;
    });
  }

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
    this.pathHeight = hasAnyOpen ? 600 : 330;
  }

  // Méthode pour générer le path SVG avec la hauteur dynamique
  getPathD(): string {
    return `M12.0713 ${this.pathHeight}V3H214.521L261.938 40.7647H578V${this.pathHeight}H12.0713Z`;
  }

  // Méthode pour calculer la largeur de la barre de progression
  getProgressBarWidth(language: Language): string {
    return `${language.progressWidth}%`;
  }

  // Méthode pour calculer la hauteur du foreignObject des langages
  getLanguagesContainerHeight(): string {
    // Vérifier si au moins une flèche est ouverte
    const hasAnyOpen = Object.values(this.open).some(isOpen => isOpen);
    
    // Si aucune flèche n'est ouverte, hauteur = 40%
    // Sinon, hauteur = 88% pour laisser de la place aux descriptions
    return hasAnyOpen ? '87%' : '43%';
  }

  // Méthode pour optimiser les performances de la boucle *ngFor
  trackByLanguage(index: number, language: Language): string {
    return language.id;
  }
}
