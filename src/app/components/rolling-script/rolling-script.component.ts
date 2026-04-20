import {
  Component,
  Input,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  NgZone,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rolling-script',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rolling-script.component.html',
  styleUrls: ['./rolling-script.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RollingScriptComponent implements AfterViewInit, OnDestroy {
  @Input() code: string = '';
  @Input() typingSpeed: number = 15;
  @Input() width: string = '600px';
  @Input() height: string = '300px';

  @ViewChild('codeContainer') codeContainer!: ElementRef<HTMLElement>;

  lines: string[] = [''];
  private charIndex: number = 0;
  private intervalId: any;
  private readonly maxLines: number = 60; // Limite pour éviter de saturer le DOM

  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (this.code) {
      this.startTyping();
    }
  }

  ngOnDestroy(): void {
    this.stopTyping();
  }

  private stopTyping() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private startTyping() {
    this.stopTyping();
    
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        if (!this.code) return;

        const currentChar = this.code[this.charIndex++];

        if (currentChar === '\n') {
          this.lines.push('');
          
          // Plafonnement des lignes pour les performances
          if (this.lines.length > this.maxLines) {
            this.lines.shift();
          }
        } else {
          this.lines[this.lines.length - 1] += currentChar;
        }

        // Détection de la fin du texte pour boucler
        if (this.charIndex >= this.code.length) {
          this.charIndex = 0;
          // Assurer une nouvelle ligne au début du prochain cycle si besoin
          if (this.lines[this.lines.length - 1] !== '') {
            this.lines.push('');
          }
        }

        this.cdr.detectChanges();
        this.scrollToBottom();

      }, this.typingSpeed);
    });
  }

  private scrollToBottom() {
    if (this.codeContainer) {
      const el = this.codeContainer.nativeElement;
      // Utilisation de requestAnimationFrame pour s'assurer que le DOM est à jour
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
      });
    }
  }

  private resetAll() {
    this.lines = [''];
    this.charIndex = 0;
  }

}
