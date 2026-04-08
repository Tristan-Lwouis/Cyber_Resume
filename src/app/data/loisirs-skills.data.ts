export interface Skill {
  number: string;
  name: string;
}

export const SKILLS_DATA: Skill[] = [
  { number: '01', name: 'Pensée logique' },
  { number: '02', name: "Communication et travail d'équipe" },
  { number: '03', name: 'Esprit créatif' },
  { number: '04', name: "Capacité d'organisation" },
  { number: '05', name: 'Apprentissage autodidacte' },
  { number: '06', name: 'Travail en autonomie' },
];

export interface Loisir {
  id: string;
  name: string;
  imagePath: string;
  animations: string[];
}

export const LOISIRS_DATA: Loisir[] = [
  { id: 'hiking', name: 'Hiking', imagePath: 'assets/media/icons/Hiking.png', animations: ['climb1'] },
  { id: 'cybersec', name: 'CyberSec', imagePath: 'assets/media/icons/CyberSec.png', animations: ['idle-to-sit', 'sit-to-type', 'type', 'type-to-sit', 'sit-to-idle'] },
  { id: 'boxing', name: 'Boxing', imagePath: 'assets/media/icons/Boxing.png', animations: ['boxe'] },
  { id: 'shooting', name: 'Shooting', imagePath: 'assets/media/icons/Shooting.png', animations: ['gun'] },
  { id: 'forging', name: 'Forging', imagePath: 'assets/media/icons/Axe.png', animations: ['axe'] },
  { id: 'graphism', name: 'Graphism', imagePath: 'assets/media/icons/Graphism.png', animations: ['idle-to-sit', 'sit-to-type', 'type', 'type-to-sit', 'sit-to-idle'] },
  { id: '3d', name: '3D', imagePath: 'assets/media/icons/3D.png', animations: ['idle-to-sit', 'sit-to-type', 'type', 'type-to-sit', 'sit-to-idle'] },
  { id: 'guitar', name: 'Guitar', imagePath: 'assets/media/icons/Guitar.png', animations: ['guitar'] },
];
