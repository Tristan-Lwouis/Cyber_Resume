import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ViewportLineData {
  id: string;           // Identifiant unique du composant
  startX: number;       // Position X du point de départ
  startY: number;       // Position Y du point de départ
  endX: number;         // Position X du point d'arrivée
  endY: number;         // Position Y du point d'arrivée
  length: number;       // Longueur de la ligne (pour compatibilité)
  angle: number;        // Angle de rotation (plus utilisé, gardé pour compatibilité)
  isActive: boolean;    // Si la ligne est active
  color?: string;       // Couleur optionnelle de la ligne
  lineWidth?: number;   // Épaisseur de la ligne (par défaut: 5)
  intermediateX?: number; // Position X du point intermédiaire
  intermediateY?: number; // Position Y du point intermédiaire
}

@Injectable({
  providedIn: 'root'
})
export class ViewportLineService {
  private linesSubject = new BehaviorSubject<Map<string, ViewportLineData>>(new Map());
  public lines$ = this.linesSubject.asObservable();

  updateLine(componentId: string, data: Omit<ViewportLineData, 'id'>): void {
    console.log('ViewportLineService updateLine - componentId:', componentId, 'data:', data);
    const currentLines = new Map(this.linesSubject.value);
    currentLines.set(componentId, { ...data, id: componentId });
    this.linesSubject.next(currentLines);
    console.log('ViewportLineService - total lines:', currentLines.size);
  }

  toggleLine(componentId: string, isActive: boolean): void {
    const currentLines = new Map(this.linesSubject.value);
    const existingLine = currentLines.get(componentId);
    if (existingLine) {
      existingLine.isActive = isActive;
      currentLines.set(componentId, existingLine);
      this.linesSubject.next(currentLines);
    }
  }

  removeLine(componentId: string): void {
    const currentLines = new Map(this.linesSubject.value);
    currentLines.delete(componentId);
    this.linesSubject.next(currentLines);
  }

  getActiveLines(): ViewportLineData[] {
    return Array.from(this.linesSubject.value.values()).filter(line => line.isActive);
  }

  getLine(componentId: string): ViewportLineData | undefined {
    return this.linesSubject.value.get(componentId);
  }
}
