import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Service pour gérer les z-index des fenêtres de manière similaire à Windows
 * Permet de faire passer une fenêtre au premier plan quand on clique dessus
 */
@Injectable({
  providedIn: 'root'
})
export class WindowManagerService {
  private baseZIndex = 1000; // Z-index de base pour toutes les fenêtres
  private currentMaxZIndex = 1000; // Z-index le plus élevé actuellement utilisé
  private windowZIndexes = new Map<string, number>(); // Map des z-index par ID de fenêtre
  private activeWindowSubject = new BehaviorSubject<string | null>(null); // Fenêtre actuellement active

  constructor() { }

  /**
   * Enregistre une nouvelle fenêtre dans le système de gestion
   * @param windowId - Identifiant unique de la fenêtre
   * @returns Le z-index assigné à cette fenêtre
   */
  registerWindow(windowId: string): number {
    if (!this.windowZIndexes.has(windowId)) {
      this.windowZIndexes.set(windowId, this.baseZIndex);
    }
    return this.windowZIndexes.get(windowId)!;
  }

  /**
   * Fait passer une fenêtre au premier plan
   * @param windowId - Identifiant de la fenêtre à activer
   * @returns Le nouveau z-index de la fenêtre
   */
  bringToFront(windowId: string): number {
    if (!this.windowZIndexes.has(windowId)) {
      this.registerWindow(windowId);
    }

    // Incrémente le z-index maximum et l'assigne à la fenêtre
    this.currentMaxZIndex += 10;
    this.windowZIndexes.set(windowId, this.currentMaxZIndex);
    
    // Met à jour la fenêtre active
    this.activeWindowSubject.next(windowId);
    
    return this.currentMaxZIndex;
  }

  /**
   * Récupère le z-index actuel d'une fenêtre
   * @param windowId - Identifiant de la fenêtre
   * @returns Le z-index de la fenêtre
   */
  getWindowZIndex(windowId: string): number {
    return this.windowZIndexes.get(windowId) || this.baseZIndex;
  }

  /**
   * Vérifie si une fenêtre est actuellement active (au premier plan)
   * @param windowId - Identifiant de la fenêtre
   * @returns true si la fenêtre est active
   */
  isWindowActive(windowId: string): boolean {
    return this.activeWindowSubject.value === windowId;
  }

  /**
   * Observable pour écouter les changements de fenêtre active
   * @returns Observable qui émet l'ID de la fenêtre active
   */
  getActiveWindowObservable(): Observable<string | null> {
    return this.activeWindowSubject.asObservable();
  }

  /**
   * Supprime une fenêtre du système de gestion
   * @param windowId - Identifiant de la fenêtre à supprimer
   */
  unregisterWindow(windowId: string): void {
    this.windowZIndexes.delete(windowId);
    
    // Si la fenêtre supprimée était active, on met à jour l'état
    if (this.activeWindowSubject.value === windowId) {
      this.activeWindowSubject.next(null);
    }
  }

  /**
   * Récupère toutes les fenêtres enregistrées avec leurs z-index
   * @returns Map des fenêtres et leurs z-index
   */
  getAllWindows(): Map<string, number> {
    return new Map(this.windowZIndexes);
  }
}
