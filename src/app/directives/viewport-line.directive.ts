import { Directive, ElementRef, Input, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ViewportLineService, ViewportLineData } from '../services/viewport-line.service';
import { CdkDragMove } from '@angular/cdk/drag-drop';

@Directive({
  selector: '[appViewportLine]',
  standalone: true
})
export class ViewportLineDirective implements OnInit, OnDestroy {
  @Input() componentId: string = '';
  @Input() lineColor: string = 'black';
  @Input() isActive: boolean = true;
  /**
   * Pourcentage de la largeur de l'écran pour calculer la distance du point intermédiaire de la ligne.
   * Cette valeur détermine à quelle distance du composant le point intermédiaire sera placé.
   * Par défaut : 12% de la largeur de l'écran.
   * Exemple : distancePercentage = 15 signifie que le point intermédiaire sera à 15% de window.innerWidth du composant.
   */
  @Input() distancePercentage: number = 12;

  private lastPosition = { x: 0, y: 0 };
  private isDragging = false;

  constructor(
    private elementRef: ElementRef,
    private viewportLineService: ViewportLineService
  ) {}

  ngOnInit(): void {
    console.log('ViewportLineDirective ngOnInit - componentId:', this.componentId, 'isActive:', this.isActive);
    if (this.componentId && this.isActive) {
      this.calculateAndUpdateLine();
    }
  }

  ngOnDestroy(): void {
    if (this.componentId) {
      this.viewportLineService.removeLine(this.componentId);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.componentId && this.isActive) {
      this.calculateAndUpdateLine();
    }
  }

  // Méthode à appeler manuellement lors du drag
  onDragMoved(dragEvent: CdkDragMove): void {
    if (this.componentId && this.isActive) {
      this.calculateAndUpdateLineFromDrag(dragEvent);
    }
  }

  private calculateOptimalDirection(startX: number, startY: number, centerX: number, centerY: number): number {
    // Calculer la direction vers le centre
    const deltaX = centerX - startX;
    const deltaY = centerY - startY;
    
    // Déterminer la direction cardinale la plus proche
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Mouvement horizontal dominant
      return deltaX > 0 ? 0 : 180; // 0° (droite) ou 180° (gauche)
    } else {
      // Mouvement vertical dominant
      return deltaY > 0 ? 90 : 270; // 90° (bas) ou 270° (haut)
    }
  }

  private calculateIntermediatePoint(
    startX: number,
    startY: number,
    direction: number,
    distance: number = this.distancePercentage * window.innerWidth / 100): { x: number, y: number } {
    const radians = (direction * Math.PI) / 180;
    return {
      x: startX + Math.cos(radians) * distance,
      y: startY + Math.sin(radians) * distance
    };
  }

  private calculateAndUpdateLineFromDrag(dragEvent: CdkDragMove): void {
    // Centre du viewport en X, 40% de la hauteur en Y
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight * 0.4;

    // Utiliser TOUJOURS getBoundingClientRect() pour la cohérence
    const elementRect = this.elementRef.nativeElement.getBoundingClientRect();
    
    // Point de départ : centre du composant (même logique que l'initialisation)
    const startX = elementRect.left + elementRect.width / 2;
    const startY = elementRect.top + elementRect.height / 2;
    
    // Point d'arrivée : centre du viewport
    const endX = viewportCenterX;
    const endY = viewportCenterY;
    
    // Calculer la direction optimale
    const optimalDirection = this.calculateOptimalDirection(startX, startY, endX, endY);
    
    // Calculer le point intermédiaire à la distance définie par distancePercentage
    const intermediatePoint = this.calculateIntermediatePoint(startX, startY, optimalDirection, this.distancePercentage * window.innerWidth / 100);
    
    // Calculer la longueur totale
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const totalLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Éviter les sauts en vérifiant si la position a vraiment changé
    const currentPos = { x: startX, y: startY };
    const hasChanged = Math.abs(currentPos.x - this.lastPosition.x) > 0.5 || 
                      Math.abs(currentPos.y - this.lastPosition.y) > 0.5;
    
    if (hasChanged) {
      this.lastPosition = currentPos;
      
      // Mettre à jour la ligne via le service avec les points intermédiaires
      this.viewportLineService.updateLine(this.componentId, {
        startX,
        startY,
        endX,
        endY,
        length: totalLength,
        angle: optimalDirection,
        isActive: this.isActive,
        color: this.lineColor,
        intermediateX: intermediatePoint.x,
        intermediateY: intermediatePoint.y
      });
    }
  }

  private calculateAndUpdateLine(): void {
    // Centre du viewport en X, 40% de la hauteur en Y
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight * 0.4;

    // Position du composant (pour l'initialisation)
    const elementRect = this.elementRef.nativeElement.getBoundingClientRect();
    
    // Point de départ : centre du composant
    const startX = elementRect.left + elementRect.width / 2;
    const startY = elementRect.top + elementRect.height / 2;
    
    // Point d'arrivée : centre du viewport
    const endX = viewportCenterX;
    const endY = viewportCenterY;
    
    // Calculer la direction optimale
    const optimalDirection = this.calculateOptimalDirection(startX, startY, endX, endY);
    
    // Calculer le point intermédiaire à la distance définie par distancePercentage
    const intermediatePoint = this.calculateIntermediatePoint(startX, startY, optimalDirection, this.distancePercentage * window.innerWidth / 100);
    
    // Calculer la longueur totale
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const totalLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Initialiser la dernière position
    this.lastPosition = { x: startX, y: startY };

    // Mettre à jour la ligne via le service avec les points intermédiaires
    this.viewportLineService.updateLine(this.componentId, {
      startX,
      startY,
      endX,
      endY,
      length: totalLength,
      angle: optimalDirection,
      isActive: this.isActive,
      color: this.lineColor,
      intermediateX: intermediatePoint.x,
      intermediateY: intermediatePoint.y
    });
  }

  // Méthode publique pour activer/désactiver la ligne
  public toggleLine(active: boolean): void {
    this.isActive = active;
    if (active) {
      this.calculateAndUpdateLine();
    } else {
      this.viewportLineService.toggleLine(this.componentId, false);
    }
  }

  // Méthode publique pour changer la couleur
  public setLineColor(color: string): void {
    this.lineColor = color;
    if (this.isActive) {
      this.calculateAndUpdateLine();
    }
  }
}
