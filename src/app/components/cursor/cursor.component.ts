import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.scss']
})
export class CursorComponent {
  x = 0;
  y = 0;
  isClicked = false;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.x = event.clientX;
    this.y = event.clientY;
  }

  @HostListener('document:mousedown')
  onMouseDown() {
    this.isClicked = true;
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isClicked = false;
  }
}
