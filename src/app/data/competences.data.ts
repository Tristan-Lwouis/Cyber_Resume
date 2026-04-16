// Interface pour définir la structure d'un langage
export interface Language {
  id: string;
  name: string;
  icon: string;
  progressWidth: number; // Largeur de la barre de progression (0-100)
  skills: string[]; // Liste des compétences
}

export const COMPETENCES_DATA: Language[] = [
  { // ANGULAR
    id: 'angular',
    name: 'ANGULAR',
    icon: 'assets/media/icons/LANG_Angular.svg',
    progressWidth: 80,
    skills: [
      'Composants standalone et architecture modulaire',
      'RxJS, Observables et communication entre composants',
      'Routing, guards et navigation SPA',
      'Reactive Forms et gestion d’état local',
      'Intégration UI, animations et optimisation front'
    ]
  },
  { // VUE.JS
    id: 'vuejs',
    name: 'VUE.JS',
    icon: 'assets/media/icons/LANG_vue.svg',
    progressWidth: 72,
    skills: [
      'Composants Vue 3 et structuration modulaire',
      'Props, emits et gestion des événements',
      'Routing et navigation applicative',
      'Développement de modules métier complexes',
      'Création d’interfaces dynamiques'
    ]
  },
  { // JAVASCRIPT / TYPESCRIPT
    id: 'javascript-typescript',
    name: 'JAVASCRIPT / TYPESCRIPT',
    icon: 'assets/media/icons/LANG_logo-javascript.svg',
    progressWidth: 78,
    skills: [
      'Programmation asynchrone (promesses, async/await)',
      'Typage, interfaces et modularisation',
      'Manipulation du DOM et logique front-end',
      'Appels API REST et traitement des données',
      'Développement d’applications web modernes'
    ]
  },
  { // JAVA
    id: 'java',
    name: 'JAVA',
    icon: 'assets/media/icons/LANG_logo-java-coffee-cup.svg',
    progressWidth: 72,
    skills: [
      'Programmation orientée objet et principes SOLID',
      'Collections, exceptions et logique métier',
      'Interfaces, héritage et polymorphisme',
      'Architecture applicative en couches',
      'Développement d’applications web et métier'
    ]
  },
  { // SPRING BOOT
    id: 'springboot',
    name: 'SPRING BOOT',
    icon: 'assets/media/icons/LANG_logo-spring-boot.svg',
    progressWidth: 75,
    skills: [
      'Création d’API REST et contrôleurs MVC',
      'Architecture Controller / Service / Repository',
      'JPA / Hibernate et mapping relationnel',
      'Connexion MariaDB et persistance des données',
      'Validation, structuration et logique back-end'
    ]
  },
  { // PYTHON
    id: 'python',
    name: 'PYTHON',
    icon: 'assets/media/icons/LANG_python.svg',
    progressWidth: 58,
    skills: [
      'Scripts utilitaires et automatisation',
      'Programmation orientée objet',
      'Manipulation de fichiers JSON / YAML / CSV',
      'Développement de logique back-end légère',
      'Traitement de données et prototypage rapide'
    ]
  },
  { // SQL / MARIADB
    id: 'sql-mariadb',
    name: 'SQL / MARIADB',
    icon: 'assets/media/icons/LANG_database.svg',
    progressWidth: 70,
    skills: [
      'Conception de bases relationnelles',
      'Requêtes SQL, jointures et filtres avancés',
      'Modélisation MCD / MLD',
      'Relations, contraintes et intégrité des données',
      'Exploitation de données métier'
    ]
  },
  { // HTML / CSS
    id: 'html-css',
    name: 'HTML / CSS',
    icon: 'assets/media/icons/LANG_html-css.svg',
    progressWidth: 85,
    skills: [
      'Intégration responsive et sémantique',
      'Mise en page Flexbox / Grid',
      'Animations CSS et effets visuels',
      'Création d’interfaces modernes',
      'Adaptation fidèle de maquettes'
    ]
  },
  { // UML
    id: 'uml',
    name: 'UML',
    icon: 'assets/media/icons/LANG_UML.svg',
    progressWidth: 72,
    skills: [
      'Diagrammes de cas d’utilisation',
      'Diagrammes de classes et de séquence',
      'Modélisation fonctionnelle et technique',
      'Traduction du besoin métier en conception',
      'Préparation de documentation projet'
    ]
  },
  { // GIT
    id: 'git',
    name: 'GIT',
    icon: 'assets/media/icons/LANG_git.svg',
    progressWidth: 88,
    skills: [
      'Gestion de versions et historique de projet',
      'Branches, merges et résolution de conflits',
      'Rebase, cherry-pick et bonnes pratiques',
      'Collaboration via GitHub / GitLab',
      'Organisation de projets et suivi des évolutions'
    ]
  },
  { // DOCKER
    id: 'docker',
    name: 'DOCKER',
    icon: 'assets/media/icons/LANG_docker.svg',
    progressWidth: 55,
    skills: [
      'Conteneurisation d’applications',
      'Création et lecture de Dockerfile',
      'Gestion d’environnements de développement',
      'Lancement de services avec Docker Compose',
      'Base de déploiement applicatif'
    ]
  },
  { // ARCHITECTURE LOGICIELLE
    id: 'software-architecture',
    name: 'ARCHITECTURE LOGICIELLE',
    icon: 'assets/media/icons/LANG_architecture.svg',
    progressWidth: 75,
    skills: [
      'Architecture en couches (3-tier / n-tier)',
      'Séparation des responsabilités',
      'Structuration d’applications métier',
      'Conception d’API REST',
      'Modélisation technique et fonctionnelle'
    ]
  },
  { // SÉCURITÉ WEB
    id: 'web-security',
    name: 'SÉCURITÉ WEB',
    icon: 'assets/media/icons/LANG_security.svg',
    progressWidth: 65,
    skills: [
      'Authentification via OIDC',
      'Gestion des tokens JWT',
      'Protection des accès et des routes',
      'Bonnes pratiques de sécurité web',
      'Veille sur les vulnérabilités'
    ]
  },
  { // THREE.JS
    id: 'threejs',
    name: 'THREE.JS',
    icon: 'assets/media/icons/LANG_threejs.svg',
    progressWidth: 60,
    skills: [
      'Création de scènes 3D interactives',
      'Animations et effets visuels temps réel',
      'Intégration dans des interfaces web',
      'Travail sur l’ambiance visuelle',
      'Expérimentations graphiques orientées portfolio'
    ]
  }
];

export const SECONDARY_COMPETENCES_DATA: Language[] = [
  { // FIGMA
    id: 'figma',
    name: 'FIGMA',
    icon: 'assets/media/icons/LANG_figma.svg',
    progressWidth: 85,
    skills: [
      'Maquettage UI/UX',
      'Prototypage interactif',
      'Design systems',
      'Parcours utilisateur'
    ]
  },
  { // PHOTOSHOP
    id: 'photoshop',
    name: 'PHOTOSHOP',
    icon: 'assets/media/icons/LANG_photoshop.svg',
    progressWidth: 78,
    skills: [
      'Retouche et composition visuelle',
      'Création de visuels web',
      'Détourage et photomontage',
      'Travail d’ambiance graphique'
    ]
  },
  { // ILLUSTRATOR
    id: 'illustrator',
    name: 'ILLUSTRATOR',
    icon: 'assets/media/icons/LANG_illustrator.svg',
    progressWidth: 72,
    skills: [
      'Création vectorielle',
      'Logos et identité visuelle',
      'Illustrations et icônes',
      'Préparation de supports graphiques'
    ]
  },
  { // INDESIGN
    id: 'indesign',
    name: 'INDESIGN',
    icon: 'assets/media/icons/LANG_indesign.svg',
    progressWidth: 65,
    skills: [
      'Mise en page de documents',
      'Structuration de contenus',
      'Création de supports de présentation',
      'Travail éditorial'
    ]
  },
  { // AUTOCAD
    id: 'autocad',
    name: 'AUTOCAD',
    icon: 'assets/media/icons/LANG_autocad.svg',
    progressWidth: 92,
    skills: [
      'Dessin technique 2D avancé',
      'Lecture et production de plans',
      'Maîtrise des normes et de la précision industrielle',
      'Expérience professionnelle en bureau d’étude'
    ]
  },
  { // MODÉLISATION 3D
    id: '3d-modeling',
    name: 'MODÉLISATION 3D',
    icon: 'assets/media/icons/LANG_3d.svg',
    progressWidth: 82,
    skills: [
      'Modélisation sur Inventor et SketchUp',
      'Conception de pièces et assemblages',
      'Visualisation technique et volumique',
      'Approche orientée conception et ingénierie'
    ]
  },
  { // LINUX / WSL / VM
    id: 'linux-environment',
    name: 'LINUX / WSL / VM',
    icon: 'assets/media/icons/LANG_linux.svg',
    progressWidth: 75,
    skills: [
      'Utilisation quotidienne de Debian',
      'Gestion de paquets et environnement système',
      'WSL2 pour le développement',
      'Commandes shell et scripts basiques',
      'Virtualisation et gestion de machines virtuelles'
    ]
  }
];