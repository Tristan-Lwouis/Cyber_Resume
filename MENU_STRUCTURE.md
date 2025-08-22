# Structure des MenuStates - Cyber Resume

## Vue d'ensemble
Le système de menu utilise un tableau `menuStates` pour gérer l'état de tous les onglets de l'application.

## Structure du tableau menuStates

```typescript
menuStates: boolean[] = [true, true, true, false, false, false];
//                      [0]     [1]     [2]        [3]    [4]     [5]
//                      Exp     Form    Comp       Skills Loisirs Portfolio
```

### Indices et correspondances

| Index | Nom | Description | État initial |
|-------|-----|-------------|--------------|
| 0 | Experience | Onglet des expériences professionnelles | `true` |
| 1 | Formation | Onglet des formations et diplômes | `true` |
| 2 | Competences | Onglet des compétences générales | `true` |
| 3 | Skills | Onglet des compétences techniques | `false` |
| 4 | Loisirs | Onglet des loisirs et hobbies | `false` |
| 5 | Portfolio | Onglet du portfolio de projets | `false` |

## Getters dans AppComponent

```typescript
get showExperience(): boolean { return this.menuStates[0]; }  // Index 0
get showFormation(): boolean { return this.menuStates[1]; }   // Index 1
get showCompetences(): boolean { return this.menuStates[2]; } // Index 2
get showSkills(): boolean { return this.menuStates[3]; }      // Index 3
get showLoisirs(): boolean { return this.menuStates[4]; }     // Index 4
get showPortfolio(): boolean { return this.menuStates[5]; }   // Index 5
```

## Logique spéciale

### Skills et Loisirs (Indices 3 et 4)
- Ces onglets sont mutuellement exclusifs
- Quand l'un est activé, l'autre est automatiquement désactivé
- Ils partagent le même composant `loisir-skills`
- Gestion des z-index pour l'effet de superposition

### Portfolio (Index 5)
- Quand activé, masque automatiquement l'avatar et l'info-bulle
- Désactive tous les autres onglets
- Logique spéciale dans `handlePortfolioToggle()`

## Méthodes principales

### `onMenuToggle(event)`
- Gère les clics sur les onglets du menu principal
- Distribue les événements selon le type d'onglet

### `handleSkillsLoisirsToggle(index, isActive)`
- Gère le toggle exclusif entre Skills et Loisirs
- Met à jour les z-index pour l'effet de superposition

### `onTabToggle(event)`
- Gère les onglets internes du composant loisir-skills
- Synchronise avec l'état du menu principal

## Points d'attention

⚠️ **IMPORTANT** : Les indices doivent toujours correspondre à cette structure. 
Ne jamais modifier l'ordre ou ajouter/supprimer des éléments sans mettre à jour tous les endroits qui utilisent ces indices.

## Fichiers concernés

- `src/app/app.component.ts` - Logique principale
- `src/app/components/menu/menu.component.ts` - Composant menu
- `src/app/components/menu/menu.component.html` - Template du menu
- `src/app/app.component.html` - Template principal
