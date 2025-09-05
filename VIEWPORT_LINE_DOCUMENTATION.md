# 📐 Documentation - Ligne de Référence du Viewport

## 🎯 Vue d'ensemble

La ligne de référence du viewport est une fonctionnalité qui affiche une ligne noire partant du centre du composant "Experience" et pointant vers le centre de l'écran. Cette ligne sert de référence visuelle et se met à jour en temps réel lors du déplacement du composant.

## 🏗️ Architecture

### Composants impliqués

1. **`ViewportLineService`** - Service de communication centralisé
2. **`PersonalInfoComponent`** (Experience) - Calcule et envoie les coordonnées
3. **`AppComponent`** - Affiche la ligne et écoute les mises à jour

### Flux de données

```
PersonalInfoComponent → ViewportLineService → AppComponent
     (calcul)              (communication)      (affichage)
```

## 🔧 Implémentation technique

### 1. Service de communication (`ViewportLineService`)

**Fichier :** `src/app/services/viewport-line.service.ts`

```typescript
export interface ViewportLineData {
  startX: number;    // Position X du point de départ
  startY: number;    // Position Y du point de départ
  length: number;    // Longueur de la ligne
  angle: number;     // Angle de rotation de la ligne
}
```

**Fonctionnalités :**
- `BehaviorSubject` pour stocker les données actuelles
- Observable public pour la diffusion des mises à jour
- Méthode `updateLine()` pour envoyer de nouvelles coordonnées

### 2. Composant Experience (`PersonalInfoComponent`)

**Fichier :** `src/app/components/personal-info/personal-info.component.ts`

**Responsabilités :**
- Calculer la position du centre du composant SVG
- Calculer la longueur et l'angle de la ligne
- Envoyer les données via le service lors du drag

**Méthodes clés :**

#### `calculateLinePosition()`
```typescript
private calculateLinePosition(): void {
  // 1. Obtenir le centre du viewport
  const viewportCenterX = window.innerWidth / 2;
  const viewportCenterY = window.innerHeight / 2;

  // 2. Obtenir la position du SVG
  const svgElement = this.elementRef.nativeElement.querySelector('#svg');
  const svgRect = svgElement.getBoundingClientRect();

  // 3. Calculer le centre du composant
  this.lineStartX = svgRect.left + svgRect.width / 2;
  this.lineStartY = svgRect.top + svgRect.height / 2;

  // 4. Calculer la longueur et l'angle
  const deltaX = viewportCenterX - this.lineStartX;
  const deltaY = viewportCenterY - this.lineStartY;
  
  this.lineLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  this.lineAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

  // 5. Envoyer au service
  this.viewportLineService.updateLine({...});
}
```

#### `onDragMoved()`
```typescript
onDragMoved(event: CdkDragMove): void {
  requestAnimationFrame(() => {
    this.calculateLinePosition();
  });
}
```

### 3. Composant Principal (`AppComponent`)

**Fichier :** `src/app/app.component.ts`

**Responsabilités :**
- Afficher la ligne de référence
- Écouter les mises à jour du service
- Mettre à jour les propriétés de la ligne

**Propriétés de la ligne :**
```typescript
experienceLineStartX: number = 0;    // Position X de départ
experienceLineStartY: number = 0;    // Position Y de départ
experienceLineLength: number = 100;  // Longueur de la ligne
experienceLineAngle: number = 45;    // Angle de rotation
```

**Abonnement au service :**
```typescript
ngOnInit(): void {
  this.viewportLineService.lineData$.subscribe(data => {
    this.experienceLineStartX = data.startX;
    this.experienceLineStartY = data.startY;
    this.experienceLineLength = data.length;
    this.experienceLineAngle = data.angle;
  });
}
```

### 4. Template HTML (`AppComponent`)

**Fichier :** `src/app/app.component.html`

```html
<!-- Ligne de référence du composant experience vers le centre du viewport -->
<div class="viewport-line" 
     *ngIf="showExperience"
     [style.left.px]="experienceLineStartX" 
     [style.top.px]="experienceLineStartY"
     [style.width.px]="experienceLineLength"
     [style.transform]="'rotate(' + experienceLineAngle + 'deg)'"
     [style.transform-origin]="'0 0'">
</div>
```

### 5. Styles CSS

**Fichier :** `src/app/app.component.scss`

```scss
.viewport-line {
  position: fixed;           // Position fixe par rapport au viewport
  height: 5px;              // Épaisseur de la ligne
  background-color: black;  // Couleur noire
  z-index: -1;              // En arrière-plan
  pointer-events: none;     // N'interfère pas avec les interactions
}
```

## 🔄 Cycle de vie

### 1. Initialisation
- Le composant Experience se charge
- `ngOnInit()` s'exécute avec un délai de 100ms
- `calculateLinePosition()` calcule la position initiale
- Les données sont envoyées au service

### 2. Mise à jour en temps réel
- L'utilisateur déplace le composant avec le handle
- `onDragMoved()` se déclenche à chaque mouvement
- `calculateLinePosition()` recalcule les coordonnées
- Les nouvelles données sont envoyées au service
- L'AppComponent reçoit les mises à jour et met à jour la ligne

### 3. Responsivité
- Le composant écoute les événements de redimensionnement
- La ligne s'adapte automatiquement aux changements de taille d'écran

## 📐 Calculs mathématiques

### Position du point de départ
```typescript
// Centre du composant SVG
startX = svgRect.left + (svgRect.width / 2)
startY = svgRect.top + (svgRect.height / 2)
```

### Longueur de la ligne
```typescript
// Distance euclidienne entre les deux points
deltaX = viewportCenterX - startX
deltaY = viewportCenterY - startY
length = √(deltaX² + deltaY²)
```

### Angle de rotation
```typescript
// Angle en degrés par rapport à l'axe horizontal
angle = atan2(deltaY, deltaX) * (180 / π)
```

## 🎨 Personnalisation

### Modifier l'apparence de la ligne

**Couleur :**
```scss
.viewport-line {
  background-color: #ff0000; // Rouge au lieu de noir
}
```

**Épaisseur :**
```scss
.viewport-line {
  height: 3px; // Plus fine
}
```

**Style :**
```scss
.viewport-line {
  border-radius: 2px;        // Coins arrondis
  box-shadow: 0 0 5px rgba(0,0,0,0.5); // Ombre
}
```

### Ajouter des animations

```scss
.viewport-line {
  transition: all 0.3s ease; // Animation fluide
}

.viewport-line:hover {
  background-color: #00ff00; // Change de couleur au survol
}
```

## 🚀 Extensions possibles

### 1. Lignes multiples
- Créer plusieurs lignes pour différents composants
- Utiliser des couleurs différentes pour chaque composant

### 2. Effets visuels
- Lignes pointillées ou avec motifs
- Effets de lueur ou de pulsation
- Animations lors de l'apparition/disparition

### 3. Interactivité
- Clic sur la ligne pour centrer le composant
- Affichage des coordonnées au survol
- Options de personnalisation dans l'interface

## 🔍 Dépannage

### Problèmes courants

**La ligne n'est pas visible :**
- Vérifier que `showExperience` est `true`
- Contrôler la console pour les erreurs de calcul
- Vérifier que le z-index est correct

**La ligne ne suit pas le composant :**
- Vérifier que `onDragMoved()` se déclenche
- Contrôler les logs de `calculateLinePosition()`
- Vérifier la communication avec le service

**Performance dégradée :**
- Utiliser `requestAnimationFrame()` pour limiter les calculs
- Optimiser les calculs mathématiques
- Limiter la fréquence des mises à jour

### Logs de débogage

```typescript
console.log('Line start:', this.lineStartX, this.lineStartY);
console.log('Line end:', endX, endY);
console.log('Line length:', this.lineLength);
console.log('Line angle:', this.lineAngle);
```

## 📚 Références

- [Angular CDK Drag & Drop](https://material.angular.io/cdk/drag-drop/overview)
- [RxJS BehaviorSubject](https://rxjs.dev/api/index/class/BehaviorSubject)
- [SVG getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
- [Math.atan2](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2)

---

*Documentation créée pour le projet Cyber Resume - Ligne de référence du viewport*
