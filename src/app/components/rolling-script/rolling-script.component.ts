import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rolling-script',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rolling-script.component.html',
  styleUrls: ['./rolling-script.component.scss']
})
export class RollingScriptComponent implements AfterViewInit {
  @Input() code: string = '';
  @Input() typingSpeed: number = 20;
  @Input() width: string = '600px';
  @Input() height: string = '300px';

  @ViewChild('codeContainer') codeContainer!: ElementRef<HTMLElement>;

  lines: string[] = [''];
  private charIndex: number = 0;
  private iterationCount: number = 0;
  private intervalId: any;

  ngAfterViewInit(): void {
    this.startTyping();
  }

  private startTyping() {
    this.intervalId = setInterval(() => {
      const currentChar = this.code[this.charIndex++];

      if (currentChar === '\n') {
        this.lines.push('');
      } else {
        this.lines[this.lines.length - 1] += currentChar;
      }

      this.scrollToBottom();

      if (this.charIndex >= this.code.length) {
        this.charIndex = 0;
        this.iterationCount++;

        if (this.iterationCount >= 15) {
          this.resetAll();
        }
      }
    }, this.typingSpeed);
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
