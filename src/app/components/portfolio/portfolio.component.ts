import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Interface pour définir la structure d'un projet portfolio
interface PortfolioItem {
  id: string;
  title: string;
  imagePath: string;
  description: string;
  technologies: {
    label: string;
  }[];
  language: {
    label: string;
  };
  difficulty: {
    label: string;
  };
  date: {
    label: string;
  };
  seeMoreLink?: string;
}

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
  // Ligne ajoutée au hasard - propriété pour la couleur du thème
  themeColor: string = '#00ff88';
  
  // Tableau des projets portfolio
  portfolioItems: PortfolioItem[] = [
    {
      id: 'nocte-grafika',
      title: '// Nocte Grafika',
      imagePath: 'assets/media/images/nocte-grafika.png',
      description: 'Nocte Grafika est mon espace créatif personnel, un portfolio où je rassemble mes travaux de design graphique et visuel.J’ai créé ce site pour partager mes projets, mes expérimentations et ma vision du graphisme.Il reflète à la fois mon style, mon univers et ma volonté de donner vie à des identités fortes et percutantes.',
      technologies: [{ label: 'Angular' }],
      language: { label: 'Francais' },
      difficulty: { label: 'Difficile' },
      date: { label: 'Aout 2025' },
      seeMoreLink: '#'
    },
    {
      id: 'nocte-grafika',
      title: '// Nocte Grafika',
      imagePath: 'assets/media/images/nocte-grafika.png',
      description: 'Nocte Grafika est mon espace créatif personnel, un portfolio où je rassemble mes travaux de design graphique et visuel.J’ai créé ce site pour partager mes projets, mes expérimentations et ma vision du graphisme.Il reflète à la fois mon style, mon univers et ma volonté de donner vie à des identités fortes et percutantes.',
      technologies: [{ label: 'Angular' }],
      language: { label: 'Francais' },
      difficulty: { label: 'Difficile' },
      date: { label: 'Aout 2025' },
      seeMoreLink: '#'
    }

  ];

  // Méthode pour ajouter un nouveau projet
  addPortfolioItem(item: PortfolioItem): void {
    this.portfolioItems.push(item);
  }

  // Méthode pour supprimer un projet
  removePortfolioItem(id: string): void {
    this.portfolioItems = this.portfolioItems.filter(item => item.id !== id);
  }

  // Méthode pour obtenir un projet par ID
  getPortfolioItem(id: string): PortfolioItem | undefined {
    return this.portfolioItems.find(item => item.id === id);
  }

  // Méthode pour optimiser le rendu de la liste avec trackBy
  trackByItemId(index: number, item: PortfolioItem): string {
    return item.id;
  }

  // Exemple d'ajout d'un nouveau projet
  addExampleProject(): void {
    const newProject: PortfolioItem = {
      id: 'mon-nouveau-projet',
      title: '// Mon Nouveau Projet',
      imagePath: 'assets/media/images/nocte-grafika.png', // Utilise la même image pour l'exemple
      description: 'Description de mon nouveau projet portfolio',
      technologies: [
        { label: 'React' },
        { label: 'TypeScript' }
      ],
      language: { label: 'Anglais' },
      difficulty: { label: 'Moyen' },
      date: { label: 'Décembre 2024' },
      seeMoreLink: 'https://github.com/mon-projet'
    };
    
    this.addPortfolioItem(newProject);
  }
}
