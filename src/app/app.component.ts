import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

// Importer les composants nécessaires pour l'application
import { LoisirSkillsComponent } from './components/loisir-skills/loisir-skills.component';
import { InfoBulleComponent } from "./components/info-bulle/info-bulle.component";
import { RollingScriptComponent } from "./components/rolling-script/rolling-script.component";
import { DecoComponent } from "./components/deco/deco.component";
import { AvatarComponent } from "./components/avatar/avatar.component";
import { PersonalInfoComponent } from "./components/personal-info/personal-info.component";
import { CursorComponent } from './components/cursor/cursor.component';
import { MenuComponent } from './components/menu/menu.component';
import { UserInformationsComponent } from './components/user-informations/user-informations.component';
import { CompetancesComponent } from './components/competances/competances.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { MemoryMonitorService } from './services/memory-monitor.service';
import { AudioEventsService } from './services/audio-events.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NgIf,
    LoisirSkillsComponent,
    InfoBulleComponent,
    RollingScriptComponent,
    DecoComponent,
    AvatarComponent,
    PersonalInfoComponent,
    CursorComponent,
    MenuComponent,
    UserInformationsComponent,
    CompetancesComponent,
    PortfolioComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  
  // ========================================
  // CONSTRUCTEUR
  // ========================================
  constructor(
    private memoryMonitor: MemoryMonitorService,
    private audioEventsService: AudioEventsService,
    private cdr: ChangeDetectorRef
  ) {}

  // ========================================
  // PROPRIÉTÉS GLOBALES
  // ========================================
  title = 'Cyber_Resume';

  // ========================================
  // PROPRIÉTÉS DU MENU PRINCIPAL
  // ========================================
  // État centralisé de tous les menus [Experience, Formation, Competences, Skills, Loisirs, Portfolio]
  // Indices: 0=Experience, 1=Formation, 2=Competences, 3=Skills, 4=Loisirs, 5=Portfolio
  menuStates: boolean[] = [true, true, true, false, false, false];
  
  // Gestion du z-index pour l'effet d'onglet entre Skills et Loisirs
  skillsZIndex: number = 2;
  loisirsZIndex: number = 1;

  // ========================================
  // PROPRIÉTÉS DE L'AVATAR
  // ========================================
  showAvatar: boolean = true;
  wasAvatarHidden: boolean = false;
  avatarClickedState: boolean = false;

  // ========================================
  // PROPRIÉTÉS DU ROLLING SCRIPT
  // ========================================
  monCode: string = ` 
> Initialisation du système...
> Scan des ports...
> Connexion à www.tristan.dev réussie.
> Lecture des logs...
> [OK] Expérience confirmée : developpement
> [OK] Reconversion en développement : validée
> [OK] Framework Angular détecté
> Ready to code.

> Routines hebdo détectées : 
> - Apprentissage (cours, veille tech)
> - Codage projet perso

printf("Chargement du profil développeur...\n");
printf("Bienvenue dans le portfolio de Tristan.\n");
printf("Chargement des compétences : HTML... OK\n");
printf("Chargement des compétences : CSS... OK\n");
printf("Chargement des compétences : JavaScript... OK\n");
printf("Chargement des compétences : Angular... EN COURS\n");
printf("Chargement des compétences : JAVA... OK\n");
printf("Chargement des compétences : JSE && J2E... OK\n");
printf("Chargement des compétences : ANDROID... OK\n");
printf("Connexion établie.\n");

while (challenge) {
  learn();
  build();
  repeat();
}
`;

  // ========================================
  // GETTERS POUR L'AFFICHAGE DES COMPOSANTS
  // ========================================
  get showExperience(): boolean { return this.menuStates[0]; }  // Index 0
  get showFormation(): boolean { return this.menuStates[1]; }   // Index 1
  get showCompetences(): boolean { return this.menuStates[2]; } // Index 2
  get showSkills(): boolean { return this.menuStates[3]; }      // Index 3
  get showLoisirs(): boolean { return this.menuStates[4]; }     // Index 4
  get showPortfolio(): boolean { return this.menuStates[5]; }   // Index 5
 
  // Getter pour afficher le loisir-skills (visible si Skills OU Loisirs est actif)
  get showUserInfoCard(): boolean { 
    return this.menuStates[3] || this.menuStates[4]; // Skills OU Loisirs
  }

  // ========================================
  // MÉTHODES DU MENU PRINCIPAL
  // ========================================
  /**
   * Méthode pour gérer les événements du menu principal
   * Distribue les événements selon le type d'onglet et joue les sons appropriés
   */
  onMenuToggle(event: {index: number, isActive: boolean}): void {
    if (event.index >= 0 && event.index < this.menuStates.length) {
      
      // Jouer le son approprié selon l'action
      this.audioEventsService.playToggleSound(event.isActive);
      
      // Logique spéciale pour Portfolio (index 5)
      if (event.index === 5) {
        this.handlePortfolioToggle(event.isActive);
      }
      // Logique spéciale pour Skills (index 3) et Loisirs (index 4)
      else if (event.index === 3 || event.index === 4) {
        this.handleSkillsLoisirsToggle(event.index, event.isActive);
      } else {
        // Comportement normal pour les autres onglets
        this.menuStates[event.index] = event.isActive;
      }
    }
  }

  /**
   * Méthode pour gérer le toggle exclusif entre Skills et Loisirs
   * Gère l'état mutuellement exclusif des onglets et les z-index pour l'effet de superposition
   */
  private handleSkillsLoisirsToggle(index: number, isActive: boolean): void {
    if (isActive) {
      // Activer l'onglet cliqué et désactiver l'autre
      this.menuStates[3] = (index === 3); // Skills (index 3)
      this.menuStates[4] = (index === 4); // Loisirs (index 4)
      
      // Gérer le z-index
      if (index === 3) { // Skills actif
        this.skillsZIndex = 2;
        this.loisirsZIndex = 1;
      } else if (index === 4) { // Loisirs actif
        this.skillsZIndex = 1;
        this.loisirsZIndex = 2;
      }
    } else {
      // Désactiver les deux onglets
      this.menuStates[3] = false;
      this.menuStates[4] = false;
      // Les z-index restent inchangés car le composant sera caché
    }
  }

  /**
   * Méthode pour gérer les événements des onglets du composant loisir-skills
   * Gère le basculement entre les onglets Skills et Loisirs avec les sons appropriés
   */
  onTabToggle(event: {tab: 'skills' | 'loisirs', isActive: boolean}): void {
    if (event.tab === 'skills') {
      // Activer Skills et désactiver Loisirs
      this.audioEventsService.playToggleSound(true);
      this.handleSkillsLoisirsToggle(3, true); // Skills (index 3)
      // Forcer la mise à jour du menu en créant une nouvelle référence
      this.menuStates = [...this.menuStates];
    } else if (event.tab === 'loisirs') {
      // Activer Loisirs et désactiver Skills
      this.audioEventsService.playToggleSound(true);
      this.handleSkillsLoisirsToggle(4, true); // Loisirs (index 4)
      // Forcer la mise à jour du menu en créant une nouvelle référence
      this.menuStates = [...this.menuStates];
    }
  }

  // ========================================
  // MÉTHODES DU PORTFOLIO
  // ========================================
  /**
   * Méthode pour gérer le toggle du Portfolio
   * Active/désactive le portfolio en masquant l'avatar et l'info-bulle, et gère l'état des autres onglets
   */
  private handlePortfolioToggle(isActive: boolean): void {
    if (isActive) {
      // Activer Portfolio et désactiver tous les autres
      this.menuStates[0] = false; // Experience
      this.menuStates[1] = false; // Formation
      this.menuStates[2] = false; // Competences
      this.menuStates[3] = false; // Skills
      this.menuStates[4] = false; // Loisirs
      this.menuStates[5] = true; // Portfolio
      this.wasAvatarHidden = true; // Masquer l'avatar
      this.showAvatar = false; // Masquer l'avatar
      this.avatarClickedState = false; // Masquer l'info-bulle
    } else {
      // Désactiver Portfolio et réactiver les onglets par défaut
      this.menuStates[5] = false; // Portfolio
      this.menuStates[0] = true; // Réactiver Experience par défaut
      this.menuStates[1] = true; // Réactiver Formation par défaut
      this.menuStates[2] = true; // Réactiver Competences par défaut
      
      // Réinitialiser le flag AVANT de réafficher l'avatar pour permettre l'animation
      this.wasAvatarHidden = false;
      // Réafficher l'avatar avec animation
      this.showAvatar = true;
    }
  }

  /**
   * Méthode appelée quand l'utilisateur clique sur le bouton close du portfolio
   * Ferme le portfolio et réaffiche l'avatar
   */
  onPortfolioClose(): void {
    // Jouer le son de fermeture
    this.audioEventsService.playCloseSound();
    
    // Fermer le portfolio en utilisant la même logique que handlePortfolioToggle(false)
    this.handlePortfolioToggle(false);
    
    // Forcer la mise à jour du menu en créant une nouvelle référence
    this.menuStates = [...this.menuStates];
  }

  // ========================================
  // MÉTHODES DE L'AVATAR
  // ========================================
  /**
   * Méthode appelée quand l'avatar est cliqué
   * Bascule l'état de l'info-bulle et joue les sons appropriés
   */
  onAvatarClicked(): void {
    console.log('Avatar cliqué - Communication avec info-bulle');
    this.avatarClickedState = !this.avatarClickedState; // Toggle pour déclencher la détection
    
    // Jouer le son d'ouverture quand l'info-bulle s'affiche
    if (this.avatarClickedState) {
      this.audioEventsService.playOpenSound();
    } else {
      this.audioEventsService.playCloseSound();
    }
  }

  // ========================================
  // MÉTHODES UTILITAIRES
  // ========================================
  /**
   * Méthode pour forcer la mise à jour de l'état du menu
   * Permet de synchroniser l'état du menu avec les onglets (méthode préparée pour usage futur)
   */
  private updateMenuState(): void {
    // Cette méthode sera appelée après chaque changement d'état pour s'assurer
    // que le menu reflète l'état actuel
    // Le menu se mettra automatiquement à jour grâce au binding [menuStates]="menuStates"
  }

  // ========================================
  // LIFECYCLE
  // ========================================
  /**
   * Méthode appelée lors de la destruction du composant
   * Arrête le monitoring de la mémoire pour éviter les fuites
   */
  ngOnDestroy(): void {
    this.memoryMonitor.stopMonitoring();
  }
}
