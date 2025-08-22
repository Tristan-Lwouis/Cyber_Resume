import { Component, Output, EventEmitter } from '@angular/core';
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
  // Événement pour fermer le portfolio
  @Output() closePortfolio = new EventEmitter<void>();
  
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
      difficulty: { label: 'Medium effort' },
      date: { label: 'Aout 2025' },
      seeMoreLink: '#'
    },
    {
      id: 'cyber-resume',
      title: '// Cyber Resume',
      imagePath: 'assets/media/images/cyber-resume.png',
      description: 'Un site web portfolio moderne avec un design cyberpunk et des animations fluides. Développé avec Angular et TypeScript, ce projet démontre mes compétences en développement front-end et en design d\'interface utilisateur.',
      technologies: [{ label: 'Angular' }, { label: 'TypeScript' }],
      language: { label: 'Francais' },
      difficulty: { label: 'High effort' },
      date: { label: 'Aout 2025' },
      seeMoreLink: '#'
    },
    {
      id: 'sphere-survie',
      title: '// Sphere Survie',
      imagePath: 'assets/media/images/Sphere-Survie.png',
      description: 'Application de gestion de tâches avec fonctionnalités avancées : catégorisation, priorités, rappels et synchronisation cloud. Interface moderne avec drag-and-drop et filtres intelligents.',
      technologies: [{ label: 'WIX' }, { label: 'HTML' }, { label: 'CSS' }, { label : 'Javascript' }],
      language: { label: 'Francais' },
      difficulty: { label: 'Medium effort' },
      date: { label: 'Janvier 2021' },
      seeMoreLink: '#'
    },
    {
      id: 'protac2a-ecommerce-app',
      title: '// PROTAC-2A E-commerce App',
      imagePath: 'assets/media/images/protac2a.png',
      description: 'Application e-commerce complète avec gestion des produits, panier d\'achat et système de paiement. Création avec un CMS et un back-office.',
      technologies: [{ label: 'WIX' }, { label: 'HTML' }, { label: 'CSS' }],
      language: { label: 'Francais' },
      difficulty: { label: 'Low effort' },
        date: { label: 'Juillet 2020' },
        seeMoreLink: '#'
    },
    // {
    //   id: 'weather-app',
    //   title: '// Weather App',
    //   imagePath: 'assets/media/images/nocte-grafika.png',
    //   description: 'Application météo avec prévisions en temps réel, géolocalisation et alertes personnalisées. Interface élégante avec animations météorologiques et données détaillées sur 7 jours.',
    //   technologies: [{ label: 'JavaScript' }, { label: 'API REST' }],
    //   language: { label: 'Anglais' },
    //   difficulty: { label: 'Facile' },
    //   date: { label: 'Septembre 2024' },
    //   seeMoreLink: '#'
    // },
    // {
    //   id: 'social-network',
    //   title: '// Social Network',
    //   imagePath: 'assets/media/images/nocte-grafika.png',
    //   description: 'Réseau social avec messagerie instantanée, partage de photos et système de notifications en temps réel. Architecture scalable avec microservices et base de données distribuée.',
    //   technologies: [{ label: 'React' }, { label: 'MongoDB' }, { label: 'Socket.io' }],
    //   language: { label: 'Francais' },
    //   difficulty: { label: 'Très Difficile' },
    //   date: { label: 'Août 2024' },
    //   seeMoreLink: '#'
    // }

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
      id: 'mon-nouveau-projet', //Ne pas mettre d'espace dans l'id
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

  // Méthode pour fermer le portfolio
  onCloseClick(): void {
    this.closePortfolio.emit();
  }
}
