import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvatarMemoryMonitorService implements OnDestroy {
  private avatarInstances: Map<string, any> = new Map();
  private monitoringInterval: any;
  private isMonitoring = false;

  constructor() {
    this.startMonitoring();
  }

  /**
   * Enregistre une instance d'avatar pour le monitoring
   */
  registerAvatar(instanceId: string, avatarInstance: any): void {
    this.avatarInstances.set(instanceId, {
      instance: avatarInstance,
      createdAt: Date.now(),
      lastMemoryCheck: 0,
      memoryHistory: []
    });
    
    console.log(`Avatar ${instanceId} enregistré pour le monitoring`);
  }

  /**
   * Désenregistre une instance d'avatar
   */
  unregisterAvatar(instanceId: string): void {
    const avatarData = this.avatarInstances.get(instanceId);
    if (avatarData) {
      console.log(`Avatar ${instanceId} désenregistré du monitoring`);
      this.avatarInstances.delete(instanceId);
    }
  }

  /**
   * Démarre le monitoring des instances d'avatar
   */
  private startMonitoring(): void {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.monitoringInterval = setInterval(() => {
      this.checkAvatarMemoryUsage();
    }, 15000); // Vérification toutes les 15 secondes
  }

  /**
   * Vérifie l'utilisation mémoire de toutes les instances d'avatar
   */
  private checkAvatarMemoryUsage(): void {
    if (!('memory' in performance)) return;

    const memory = (performance as any).memory;
    const currentMemoryMB = Math.round(memory.usedJSHeapSize / 1024 / 1024);

    this.avatarInstances.forEach((avatarData, instanceId) => {
      avatarData.memoryHistory.push(currentMemoryMB);
      
      // Garder seulement les 20 dernières mesures
      if (avatarData.memoryHistory.length > 20) {
        avatarData.memoryHistory.shift();
      }

      // Détecter les fuites mémoire spécifiques à l'avatar
      this.detectAvatarMemoryLeak(instanceId, avatarData);
    });
  }

  /**
   * Détecte les fuites mémoire spécifiques à un avatar
   */
  private detectAvatarMemoryLeak(instanceId: string, avatarData: any): void {
    if (avatarData.memoryHistory.length < 10) return;

    const recentMemory = avatarData.memoryHistory.slice(-5);
    const olderMemory = avatarData.memoryHistory.slice(-10, -5);
    
    if (recentMemory.length > 0 && olderMemory.length > 0) {
      const recentAvg = recentMemory.reduce((a: number, b: number) => a + b, 0) / recentMemory.length;
      const olderAvg = olderMemory.reduce((a: number, b: number) => a + b, 0) / olderMemory.length;
      
      // Si la mémoire a augmenté de plus de 15% sur les 5 dernières mesures
      if (recentAvg > olderAvg * 1.15) {
        console.warn(`⚠️ Fuite mémoire détectée sur l'avatar ${instanceId}!`, {
          ancienneMoyenne: Math.round(olderAvg),
          nouvelleMoyenne: Math.round(recentAvg),
          augmentation: Math.round(((recentAvg - olderAvg) / olderAvg) * 100) + '%',
          duréeDeVie: Math.round((Date.now() - avatarData.createdAt) / 1000) + 's'
        });
        
        // Suggérer un nettoyage forcé
        this.suggestCleanup(instanceId, avatarData);
      }
    }
  }

  /**
   * Suggère un nettoyage forcé pour une instance d'avatar
   */
  private suggestCleanup(instanceId: string, avatarData: any): void {
    if (avatarData.instance && typeof avatarData.instance.forceCleanup === 'function') {
      console.log(`🧹 Nettoyage forcé suggéré pour l'avatar ${instanceId}`);
      avatarData.instance.forceCleanup();
    }
  }

  /**
   * Obtient les statistiques de mémoire pour une instance d'avatar
   */
  getAvatarMemoryStats(instanceId: string): { current: number, average: number, trend: string } | null {
    const avatarData = this.avatarInstances.get(instanceId);
    if (!avatarData || avatarData.memoryHistory.length === 0) {
      return null;
    }

    const current = avatarData.memoryHistory[avatarData.memoryHistory.length - 1];
    const average = avatarData.memoryHistory.reduce((a: number, b: number) => a + b, 0) / avatarData.memoryHistory.length;
    
    let trend = 'stable';
    if (avatarData.memoryHistory.length >= 5) {
      const recent = avatarData.memoryHistory.slice(-3);
      const older = avatarData.memoryHistory.slice(-6, -3);
      if (recent.length > 0 && older.length > 0) {
        const recentAvg = recent.reduce((a: number, b: number) => a + b, 0) / recent.length;
        const olderAvg = older.reduce((a: number, b: number) => a + b, 0) / older.length;
        trend = recentAvg > olderAvg ? 'increasing' : recentAvg < olderAvg ? 'decreasing' : 'stable';
      }
    }

    return { current, average: Math.round(average), trend };
  }

  /**
   * Arrête le monitoring
   */
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
      this.isMonitoring = false;
    }
  }

  /**
   * Implémentation de OnDestroy pour nettoyer automatiquement les ressources
   */
  ngOnDestroy(): void {
    console.log('🧹 AvatarMemoryMonitorService - Nettoyage automatique des ressources');
    this.stopMonitoring();
    
    // Nettoyer toutes les instances enregistrées
    this.avatarInstances.clear();
  }

  /**
   * Obtient le nombre d'instances d'avatar actives
   */
  getActiveAvatarCount(): number {
    return this.avatarInstances.size;
  }
}
