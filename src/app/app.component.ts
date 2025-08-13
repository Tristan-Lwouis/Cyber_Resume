import { Component, OnDestroy } from '@angular/core';
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
import { MemoryMonitorService } from './services/memory-monitor.service';

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
    CompetancesComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  title = 'Cyber_Resume';
  
  constructor(private memoryMonitor: MemoryMonitorService) {}
  
  // Propriété pour communiquer avec l'info-bulle
  avatarClickedState: boolean = false;
  
  // Propriétés pour contrôler l'affichage des composants
  // État centralisé de tous les menus
  menuStates: boolean[] = [true, false, false, false, false]; // [Experience, Competences, Skills, Loisirs, Portfolio]
  
  // Gestion du z-index pour l'effet d'onglet entre Skills et Loisirs
  skillsZIndex: number = 1;
  loisirsZIndex: number = 2;
  
  // Getters pour faciliter l'accès aux états individuels
  get showExperience(): boolean { return this.menuStates[0]; }
  get showCompetences(): boolean { return this.menuStates[1]; }
  get showSkills(): boolean { return this.menuStates[2]; }
  get showLoisirs(): boolean { return this.menuStates[3]; }
  get showPortfolio(): boolean { return this.menuStates[4]; }
  
  // Getter pour afficher le loisir-skills (visible si Skills OU Loisirs est actif)
  get showUserInfoCard(): boolean { 
    return this.menuStates[2] || this.menuStates[3]; // Skills OU Loisirs
  }
  
  // Méthode appelée quand l'avatar est cliqué
  onAvatarClicked(): void {
    console.log('Avatar cliqué - Communication avec info-bulle');
    this.avatarClickedState = !this.avatarClickedState; // Toggle pour déclencher la détection
  }
  
  // Méthode pour gérer les événements du menu
  onMenuToggle(event: {index: number, isActive: boolean}): void {
    if (event.index >= 0 && event.index < this.menuStates.length) {
      
      // Logique spéciale pour Skills (index 2) et Loisirs (index 3)
      if (event.index === 2 || event.index === 3) {
        this.handleSkillsLoisirsToggle(event.index, event.isActive);
      } else {
        // Comportement normal pour les autres onglets
        this.menuStates[event.index] = event.isActive;
      }
    }
  }
  
  // Méthode pour gérer le toggle exclusif entre Skills et Loisirs
  private handleSkillsLoisirsToggle(index: number, isActive: boolean): void {
    if (isActive) {
      // Activer l'onglet cliqué et désactiver l'autre
      this.menuStates[2] = (index === 2); // Skills
      this.menuStates[3] = (index === 3); // Loisirs
      
      // Gérer le z-index
      if (index === 2) { // Skills actif
        this.skillsZIndex = 2;
        this.loisirsZIndex = 1;
      } else { // Loisirs actif
        this.skillsZIndex = 1;
        this.loisirsZIndex = 2;
      }
    } else {
      // Désactiver les deux onglets
      this.menuStates[2] = false;
      this.menuStates[3] = false;
      // Les z-index restent inchangés car le composant sera caché
    }
  }
  
  // Méthode pour gérer les événements des onglets du loisir-skills
  onTabToggle(event: {tab: 'skills' | 'loisirs', isActive: boolean}): void {
    if (event.tab === 'skills') {
      // Si Skills est déjà actif, on le désactive (toggle)
      // Sinon on active Skills et on désactive Loisirs
      const currentSkillsState = this.menuStates[2];
      this.handleSkillsLoisirsToggle(2, !currentSkillsState);
    } else if (event.tab === 'loisirs') {
      // Si Loisirs est déjà actif, on le désactive (toggle)
      // Sinon on active Loisirs et on désactive Skills
      const currentLoisirsState = this.menuStates[3];
      this.handleSkillsLoisirsToggle(3, !currentLoisirsState);
    }
  }
  
  // Méthode pour forcer la mise à jour de l'état du menu (pour synchroniser avec les onglets)
  private updateMenuState(): void {
    // Cette méthode sera appelée après chaque changement d'état pour s'assurer
    // que le menu reflète l'état actuel
    // Le menu se mettra automatiquement à jour grâce au binding [menuStates]="menuStates"
  }
  
  ngOnDestroy(): void {
    this.memoryMonitor.stopMonitoring();
  }
  
  //Pour le composant rollingScript
  monCode : string = ` 
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
}
