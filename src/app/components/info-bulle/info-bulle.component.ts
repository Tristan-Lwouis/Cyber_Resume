import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-bulle',
  imports: [CommonModule],
  templateUrl: './info-bulle.component.html',
  styleUrl: './info-bulle.component.scss'
})
export class InfoBulleComponent implements OnInit, OnDestroy, OnChanges {
  @Input() avatarClicked: boolean = false;
  
  displayedText = '';
  fullText = "Bonjour, moi c'est Tristan, je suis en pleine reconversion professionnelle. Je me lance dans ce qui me passionne depuis toujours : l'informatique ! Je suis extrêmement motivé pour apprendre et développer mes compétences dans ce domaine. Mon objectif est de devenir concepteur developpeur d'applications.";
  currentIndex = 0;
  isTyping = false;
  isVisible = true;
  isFadingOut = false;
  private typingInterval: any;
  private hideTimer: any;
  private fadeTimer: any;

  ngOnInit() {
    this.startTyping();
  }

  ngOnDestroy() {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }
    if (this.fadeTimer) {
      clearTimeout(this.fadeTimer);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // Détecter les changements de la propriété avatarClicked
    if (changes['avatarClicked'] && !changes['avatarClicked'].firstChange) {
      console.log('Avatar cliqué détecté - Relance de la boucle info-bulle');
      this.resetAndStartTyping();
    }
  }

  startTyping() {
    this.isTyping = true;
    this.currentIndex = 0;
    this.displayedText = '';
    this.isVisible = true;
    this.isFadingOut = false;
    
    this.typingInterval = setInterval(() => {
      if (this.currentIndex < this.fullText.length) {
        this.displayedText += this.fullText[this.currentIndex];
        this.currentIndex++;
      } else {
        this.isTyping = false;
        clearInterval(this.typingInterval);
        // Démarrer le timer pour faire disparaître le composant après 15 secondes
        this.hideTimer = setTimeout(() => {
          this.fadeOut();
        }, 5000); // temps de disparition de l'info bulle
      }
    }, 20); // Vitesse de frappe (20ms entre chaque caractère)
  }

  fadeOut() {
    this.isFadingOut = true;
    // Attendre que la transition CSS se termine avant de masquer complètement
    this.fadeTimer = setTimeout(() => {
      this.isVisible = false;
    }, 300); // Durée de la transition CSS
  }

  resetAndStartTyping() {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }
    if (this.fadeTimer) {
      clearTimeout(this.fadeTimer);
    }
    this.startTyping();
  }
}
