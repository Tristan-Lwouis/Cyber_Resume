import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type AudioEventType = 'open' | 'close';

@Injectable({
  providedIn: 'root'
})
export class AudioEventsService {
  private audioEventSubject = new Subject<AudioEventType>();

  // Observable pour écouter les événements audio
  audioEvents$ = this.audioEventSubject.asObservable();

  /**
   * Émet un événement pour jouer le son d'ouverture
   */
  playOpenSound(): void {
    this.audioEventSubject.next('open');
  }

  /**
   * Émet un événement pour jouer le son de fermeture
   */
  playCloseSound(): void {
    this.audioEventSubject.next('close');
  }

  /**
   * Émet un événement pour jouer le son approprié selon l'état
   */
  playToggleSound(isOpening: boolean): void {
    if (isOpening) {
      this.playOpenSound();
    } else {
      this.playCloseSound();
    }
  }
}
