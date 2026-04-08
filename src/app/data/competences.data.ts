// Interface pour définir la structure d'un langage
export interface Language {
  id: string;
  name: string;
  icon: string;
  progressWidth: number; // Largeur de la barre de progression (0-100)
  skills: string[]; // Liste des compétences
}

export const COMPETENCES_DATA: Language[] = [
    { //ANGULAR + TS
      id: 'angular-typescript',
      name: 'ANGULAR',
      icon: 'assets/media/icons/LANG_Angular.svg',
      progressWidth: 70, // 70% de largeur
      skills: [
        'Composants et modules',
        'Data binding et directives',
        'Services et dépendances',
        'RxJS et Observables',
        'Routing et navigation'
      ]
    },
    { //JAVASCRIPT
      id: 'javascript',
      name: 'JAVASCRIPT + TYPESCRIPT',
      icon: 'assets/media/icons/LANG_logo-javascript.svg',
      progressWidth: 60, // 85% de largeur
      skills: [
        'Programmation modulaire',
        'Gestion des structures',
        'Programmation asynchrone',
        'Manipulation du DOM',
        'Frameworks modernes'
      ]
    },
    { //JAVA
      id: 'java',
      name: 'JAVA SE',
      icon: 'assets/media/icons/LANG_logo-java-coffee-cup.svg',
      progressWidth: 65,
      skills: [
        'Programmation orientée objet',
        'Gestion des collections',
        'Exceptions et gestion d’erreurs',
        'Interfaces et classes abstraites',
        'Multithreading'
      ]
    },
    { // SPRING BOOT
      id: 'springboot',
      name: 'SPRING BOOT',
      icon: 'assets/media/icons/LANG_logo-spring-boot.svg',
      // icon: 'assets/media/icons/LANG_spring-boot.svg',
      progressWidth: 70,
      skills: [
        'Création de controllers REST & MVC',
        'Architecture en couches (Controller / Service / Repository)',
        'JPA / Hibernate & mapping relationnel',
        'Intégration Thymeleaf (views dynamiques)',
        'Connexion à une base MariaDB',
        'Gestion des entités et relations complexes',
      ]
    },    
    { //J2EE
      id: 'j2ee',
      name: 'J2EE - Jakarta',
      icon: 'assets/media/icons/LANG_logo-java-coffee-cup.svg',
      progressWidth: 55,
      skills: [
        'Servlets et JSP',
        'JDBC et gestion des bases de données',
        'EJB (Enterprise Java Beans)',
        'Développement d’applications web',
        'Déploiement sur serveurs Tomcat/Glassfish'
      ]
    },
    { //PYTHON
      id: 'python',
      name: 'PYTHON',
      icon: 'assets/media/icons/LANG_python.svg',
      progressWidth: 70,
      skills: [
        'Programmation orientée objet',
        'Analyse de données',
        'Automatisation'
      ]
    },
    { //ANDROID
      id: 'android',
      name: 'ANDROID',
      icon: 'assets/media/icons/LANG_android-os.svg',
      progressWidth: 55,
      skills: [
        'Activités et fragments',
        'Cycle de vie des applications',
        'Layouts et UI',
        'Gestion des permissions',
        'Appels API et stockage local'
      ]
    },
    { //UML
      id: 'uml',
      name: 'UML',
      icon: 'assets/media/icons/LANG_UML.svg',
      progressWidth: 65,
      skills: [
        'Diagrammes de classes',
        'Diagrammes de séquence',
        'Cas d’utilisation',
        'Modélisation objet',
        'Analyse fonctionnelle'
      ]
    },
    { //C++
      id: 'cpp',
      name: 'C++',
      icon: 'assets/media/icons/LANG_C++.svg',
      progressWidth: 45,
      skills: [
        'Gestion de la mémoire',
        'Programmation orientée objet',
        'Templates et génériques',
        'Structures de données',
        'Programmation bas niveau'
      ]
    },
    { //C
      id: 'c',
      name: 'C',
      icon: 'assets/media/icons/LANG_C.svg',
      progressWidth: 50,
      skills: [
        'Pointeurs et mémoire',
        'Structures et tableaux',
        'Gestion des fichiers',
        'Compilation et Makefile',
        'Programmation système'
      ]
    },
    { //GIT
      id: 'git',
      name: 'GIT',
      icon: 'assets/media/icons/LANG_git.svg',
      progressWidth: 70,
      skills: [
        'Gestion de versions',
        'Branches et merges',
        'Rebase et cherry-pick',
        'Gestion des conflits',
        'Collaboration via GitHub/GitLab'
      ]
    },
];
