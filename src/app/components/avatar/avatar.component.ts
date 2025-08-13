import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('avatarCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @Output() avatarClicked = new EventEmitter<void>();

  // === Paramètres principaux de la scène ===
  private renderer!: THREE.WebGLRenderer; // Gère le rendu WebGL
  private scene!: THREE.Scene; // Contient tous les objets 3D
  private camera!: THREE.PerspectiveCamera; // Caméra de perspective (FOV, position, ...)
  private controls!: any; // Contrôles de la caméra (OrbitControls)
  private model: THREE.Group | undefined; // Le modèle 3D chargé (GLTF)
  private mixer?: THREE.AnimationMixer; // Pour les animations du modèle
  private raycaster = new THREE.Raycaster(); // Pour détecter les clics sur les objets 3D
  private mouse = new THREE.Vector2(); // Position de la souris
  private animationId: number | null = null; // ID de l'animation pour requestAnimationFrame
  private resizeHandler: (() => void) | null = null; // Handler pour le resize

  async ngAfterViewInit(): Promise<void> {
    await this.initThree();
    await this.loadModel();
    this.animate();
    this.setupClickDetection();
    this.resizeHandler = () => this.onResize();
    window.addEventListener('resize', this.resizeHandler);
  }

  ngOnDestroy(): void {
    // Arrêter l'animation
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    // Nettoyer l'event listener
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
      this.resizeHandler = null;
    }

    // Nettoyer les contrôles
    if (this.controls) {
      this.controls.dispose();
    }

    // Nettoyer le mixer d'animation
    if (this.mixer) {
      this.mixer.stopAllAction();
      this.mixer.uncacheRoot(this.model!);
    }

    // Nettoyer le renderer
    if (this.renderer) {
      this.renderer.dispose();
    }

    // Nettoyer la scène
    if (this.scene) {
      this.scene.clear();
    }

    // Nettoyer le modèle
    if (this.model) {
      this.model.traverse((child: any) => {
        if (child.geometry) {
          child.geometry.dispose();
        }
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((material: any) => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    }
  }

  private setupClickDetection() {
    const canvas = this.canvasRef.nativeElement;
    
    canvas.addEventListener('click', (event) => {
      // Calculer la position de la souris en coordonnées normalisées (-1 à +1)
      const rect = canvas.getBoundingClientRect();
      this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Lancer un rayon depuis la caméra vers la position de la souris
      this.raycaster.setFromCamera(this.mouse, this.camera);

      // Vérifier les intersections avec les objets de la scène
      if (this.model) {
        const intersects = this.raycaster.intersectObjects(this.model.children, true);
        
        // Si le rayon intersecte avec le modèle, émettre l'événement
        if (intersects.length > 0) {
          console.log('Clic détecté sur le modèle 3D!');
          this.avatarClicked.emit();
        }
      }
    });
  }

  private async initThree() {
    const canvas = this.canvasRef.nativeElement;
    this.scene = new THREE.Scene();
    this.scene.background = null; // Fond transparent (tu peux mettre une couleur ou une texture)

    // === Caméra ===
    // FOV (champ de vision), ratio largeur/hauteur, near/far (profondeur de vue)
    this.camera = new THREE.PerspectiveCamera(
      60, // FOV : plus grand = plus "grand angle"
      canvas.clientWidth / canvas.clientHeight, // ratio
      0.1, // near : distance minimale visible
      1000 // far : distance maximale visible
    );
    this.camera.position.set(0, 1, 2.3); // Position de la caméra (x, y, z)

    // === Renderer ===
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    // Activation des ombres (pour voir les ombres projetées)
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Type d'ombre (plus doux)

    // === Lumière ambiante ===
    // Eclaire toute la scène de façon uniforme (pas d'ombre portée)
    const ambientLight = new THREE.AmbientLight('rgb(255, 254, 252)', 1.5); // couleur et intensité
    this.scene.add(ambientLight);

    // === Lumière directionnelle (type soleil) ===
    // Simule le soleil : direction, couleur, intensité, ombres
    const sunLight = new THREE.DirectionalLight('rgb(255, 236, 198)', 7); // couleur chaude, intensité
    sunLight.position.set(8, 10, 5); // position du soleil (x, y, z)
    // Plus y est grand, plus la lumière vient d'en haut
    // x/z contrôlent la direction latérale
    sunLight.castShadow = true; // active les ombres
    sunLight.shadow.mapSize.width = 250; // qualité des ombres
    sunLight.shadow.mapSize.height = 250;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 50;
    this.scene.add(sunLight);

    // === Sol invisible pour recevoir les ombres ===
    // Le matériau ShadowMaterial rend le sol invisible mais affiche les ombres
    const planeGeometry = new THREE.PlaneGeometry(20, 20); // taille du sol
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.2 }); // intensité de l'ombre
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2; // à plat (horizontal)
    plane.position.y = 0; // hauteur du sol
    plane.receiveShadow = true; // le sol reçoit les ombres
    this.scene.add(plane);

    // === Contrôles de la caméra (OrbitControls) ===
    // Permet de tourner autour du modèle avec la souris
    // @ts-ignore
    const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls');
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; // inertie
    this.controls.dampingFactor = 0.05; // facteur d'inertie
    this.controls.target.set(0, 1, 0); // point autour duquel la caméra tourne (x, y, z)
    // Pour limiter le zoom ou la rotation, tu peux utiliser :
    this.controls.minDistance = 1;
    this.controls.maxDistance = 10;
    this.controls.maxPolarAngle = Math.PI / 2; // limite l'angle vertical
  }

  private async loadModel() {
    // @ts-ignore
    const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader');
    const loader = new GLTFLoader();
    loader.load(
      'assets/3D/model.glb',
      (gltf: any) => {
        this.model = gltf.scene;
        this.scene.add(this.model!);
        if (this.model) {
          this.model.rotation.set(0, Math.PI / 9, 0); // rotation initiale du modèle
        }

        // Debug : log les lumières importées
        this.model!.traverse((obj: any) => {
          if (obj.isLight) {
            console.log('Lumière importée du GLB :', obj);
          }
          // Activation des ombres sur les meshes du modèle
          if (obj.isMesh) {
            obj.castShadow = true; // le mesh projette une ombre
            obj.receiveShadow = true; // le mesh peut recevoir une ombre
          }
        });

        // === Gestion des animations du modèle (si présentes) ===
        if (gltf.animations && gltf.animations.length > 0) {
          this.mixer = new THREE.AnimationMixer(this.model!);
          gltf.animations.forEach((clip: THREE.AnimationClip) => {
            this.mixer!.clipAction(clip).play();
          });
        }
      },
      undefined,
      (error: any) => {
        console.error('Erreur lors du chargement du modèle 3D :', error);
      }
    );
  }

  // === Boucle d'animation ===
  // Appelée à chaque frame pour mettre à jour la scène
  private animate = () => {
    this.animationId = requestAnimationFrame(this.animate);
    if (this.controls) this.controls.update(); // met à jour les contrôles caméra
    if (this.mixer) this.mixer.update(1 / 60); // met à jour les animations (si présentes)
    this.renderer.render(this.scene, this.camera); // dessine la scène
  };

  // === Gestion du redimensionnement de la fenêtre ===
  private onResize() {
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }
}
