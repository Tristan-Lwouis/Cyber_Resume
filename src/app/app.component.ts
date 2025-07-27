import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Importer les composants nécessaires pour l'application
import { UserInfoCardComponent } from './components/user-info-card/user-info-card.component';
import { InfoBulleComponent } from "./components/info-bulle/info-bulle.component";
import { RollingScriptComponent } from "./components/rolling-script/rolling-script.component";
import { DecoComponent } from "./components/deco/deco.component";
import { AvatarComponent } from "./components/avatar/avatar.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    UserInfoCardComponent,
    InfoBulleComponent,
    RollingScriptComponent,
    DecoComponent,
    AvatarComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Cyber_Resume';
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
