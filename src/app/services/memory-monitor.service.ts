import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemoryMonitorService implements OnDestroy {
  private memoryCheckInterval: any;
  private memoryHistory: number[] = [];
  private maxHistoryLength = 50;

  constructor() {
    this.startMonitoring();
  }

  private startMonitoring(): void {
    // Vérifier la mémoire toutes les 30 secondes
    this.memoryCheckInterval = setInterval(() => {
      this.checkMemoryUsage();
    }, 30000);
  }

  private checkMemoryUsage(): void {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const usedMemoryMB = Math.round(memory.usedJSHeapSize / 1024 / 1024);
      const totalMemoryMB = Math.round(memory.totalJSHeapSize / 1024 / 1024);
      
      this.memoryHistory.push(usedMemoryMB);
      
      // Garder seulement les 50 dernières mesures
      if (this.memoryHistory.length > this.maxHistoryLength) {
        this.memoryHistory.shift();
      }

      // Détecter les fuites mémoire potentielles
      this.detectMemoryLeak(usedMemoryMB, totalMemoryMB);
      
      console.log(`Mémoire utilisée: ${usedMemoryMB}MB / ${totalMemoryMB}MB`);
    }
  }

  private detectMemoryLeak(currentMemory: number, totalMemory: number): void {
    if (this.memoryHistory.length < 10) return;

    const recentMemory = this.memoryHistory.slice(-10);
    const olderMemory = this.memoryHistory.slice(-20, -10);
    
    if (recentMemory.length > 0 && olderMemory.length > 0) {
      const recentAvg = recentMemory.reduce((a, b) => a + b, 0) / recentMemory.length;
      const olderAvg = olderMemory.reduce((a, b) => a + b, 0) / olderMemory.length;
      
      // Si la mémoire a augmenté de plus de 20% sur les 10 dernières mesures
      if (recentAvg > olderAvg * 1.2) {
        console.warn('⚠️ Fuite mémoire potentielle détectée!', {
          ancienneMoyenne: Math.round(olderAvg),
          nouvelleMoyenne: Math.round(recentAvg),
          augmentation: Math.round(((recentAvg - olderAvg) / olderAvg) * 100) + '%'
        });
      }
    }
  }

  public getMemoryStats(): { current: number, average: number, trend: string } {
    if (this.memoryHistory.length === 0) {
      return { current: 0, average: 0, trend: 'stable' };
    }

    const current = this.memoryHistory[this.memoryHistory.length - 1];
    const average = this.memoryHistory.reduce((a, b) => a + b, 0) / this.memoryHistory.length;
    
    let trend = 'stable';
    if (this.memoryHistory.length >= 5) {
      const recent = this.memoryHistory.slice(-5);
      const older = this.memoryHistory.slice(-10, -5);
      if (recent.length > 0 && older.length > 0) {
        const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
        const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;
        trend = recentAvg > olderAvg ? 'increasing' : recentAvg < olderAvg ? 'decreasing' : 'stable';
      }
    }

    return { current, average: Math.round(average), trend };
  }

  public stopMonitoring(): void {
    if (this.memoryCheckInterval) {
      clearInterval(this.memoryCheckInterval);
      this.memoryCheckInterval = null;
    }
  }

  /**
   * Implémentation de OnDestroy pour nettoyer automatiquement les ressources
   */
  ngOnDestroy(): void {
    console.log('🧹 MemoryMonitorService - Nettoyage automatique des ressources');
    this.stopMonitoring();
    
    // Nettoyer l'historique de mémoire
    this.memoryHistory = [];
  }
}
