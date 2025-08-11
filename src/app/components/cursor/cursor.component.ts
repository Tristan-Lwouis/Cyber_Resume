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
  isPointer = false;

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
}
