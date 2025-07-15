import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Importer les composants nécessaires pour l'application
import { UserInfoCardComponent } from './components/user-info-card/user-info-card.component';
import { InfoBulleComponent } from "./info-bulle/info-bulle.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    UserInfoCardComponent,
    InfoBulleComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Cyber_Resume';
}
