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
  private iterationCount: number = 0;
  private intervalId: any;

  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.startTyping();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private startTyping() {
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        const currentChar = this.code[this.charIndex++];

        if (currentChar === '\n') {
          this.lines.push('');
        } else {
          this.lines[this.lines.length - 1] += currentChar;
        }

        // On demande à Angular de rafraîchir UNIQUEMENT ce composant
        this.cdr.detectChanges();

        this.scrollToBottom();

        if (this.charIndex >= this.code.length) {
          this.charIndex = 0;
          this.iterationCount++;

          if (this.iterationCount >= 15) {
            this.resetAll();
            this.cdr.detectChanges();
          }
        }
      }, this.typingSpeed);
    });
  }

  private scrollToBottom() {
    const el = this.codeContainer.nativeElement;
    el.scrollTop = el.scrollHeight;
  }

  private resetAll() {
    this.lines = [''];
    this.charIndex = 0;
    this.iterationCount = 0;
  }
}
