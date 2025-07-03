import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Importer les composants nécessaires pour l'application
import { UserInfoCardComponent } from './components/user-info-card/user-info-card.component';

@Component({
  selector: 'app-root',
  imports: [ //Penser a ajouter les composants ici
    RouterOutlet,
    UserInfoCardComponent  
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Cyber_Resume';
}
