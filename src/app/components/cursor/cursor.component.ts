import { Component, HostListener, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioEventsService } from '../../services/audio-events.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CursorComponent implements OnInit, OnDestroy {
  x = 0;
  y = 0;
  isClicked = false;
  isPointer = false;
  
  // Propriétés audio
  private openSound: HTMLAudioElement;
  private closeSound: HTMLAudioElement;
  private audioSubscription?: Subscription;

  constructor(private audioEventsService: AudioEventsService) {
    // Initialiser les éléments audio
    this.openSound = new Audio('assets/media/soundFX/open.mp3');
    this.closeSound = new Audio('assets/media/soundFX/close.mp3');
    
    // Précharger les sons
    this.openSound.load();
    this.closeSound.load();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.x = event.clientX;
    this.y = event.clientY;
    
    // Détecter les éléments cliquables sans dépendre de cursor: pointer
    const target = event.target as HTMLElement;
    this.isPointer = this.isClickableElement(target);
  }

  @HostListener('document:mousedown')
  onMouseDown() {
    this.isClicked = true;
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isClicked = false;
  }

  private isClickableElement(element: HTMLElement): boolean {
    // Vérifier si l'élément ou ses parents sont cliquables
    let currentElement: HTMLElement | null = element;
    
    while (currentElement) {
      // Vérifier les balises cliquables
      if (['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT', 'LABEL'].includes(currentElement.tagName)) {
        return true;
      }
      
      // Vérifier les attributs qui indiquent un élément cliquable
      if (currentElement.onclick || 
          currentElement.getAttribute('onclick') ||
          // currentElement.getAttribute('click') ||
          currentElement.getAttribute('role') === 'button' ||
          currentElement.getAttribute('tabindex') !== null ||
          currentElement.classList.contains('clickable') ||
          currentElement.classList.contains('menuItem') ||
          currentElement.classList.contains('contact-info') ||
          currentElement.id === 'contact' ||
          currentElement.id === 'linkedin') {
        return true;
      }
      
      // Vérifier les styles CSS qui pourraient indiquer un élément cliquable
      const computedStyle = window.getComputedStyle(currentElement);
      if (computedStyle.pointerEvents === 'auto' && 
          (computedStyle.cursor === 'pointer' || 
           computedStyle.cursor === 'hand' ||
           currentElement.style.cursor === 'pointer')) {
        return true;
      }
      
      // Passer au parent
      currentElement = currentElement.parentElement;
    }
    
    return false;
  }

  /**
   * Joue le son d'ouverture
   */
  public playOpenSound(): void {
    this.openSound.currentTime = 0; // Remettre à zéro pour pouvoir rejouer
    this.openSound.play().catch(error => {
      console.warn('Erreur lors de la lecture du son d\'ouverture:', error);
    });
  }

  /**
   * Joue le son de fermeture
   */
  public playCloseSound(): void {
    this.closeSound.currentTime = 0; // Remettre à zéro pour pouvoir rejouer
    this.closeSound.play().catch(error => {
      console.warn('Erreur lors de la lecture du son de fermeture:', error);
    });
  }

  /**
   * Joue un son selon l'état (ouvert/fermé)
   */
  public playToggleSound(isOpening: boolean): void {
    if (isOpening) {
      this.playOpenSound();
    } else {
      this.playCloseSound();
    }
  }

  ngOnInit(): void {
    // S'abonner aux événements audio
    this.audioSubscription = this.audioEventsService.audioEvents$.subscribe(event => {
      if (event === 'open') {
        this.playOpenSound();
      } else if (event === 'close') {
        this.playCloseSound();
      }
    });
  }

  ngOnDestroy(): void {
    // Se désabonner pour éviter les fuites mémoire
    this.audioSubscription?.unsubscribe();
  }
}
