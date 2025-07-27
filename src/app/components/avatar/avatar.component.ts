import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent implements AfterViewInit {
  @ViewChild('avatarCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: any;
  private model: THREE.Group | undefined;

  async ngAfterViewInit(): Promise<void> {
    await this.initThree();
    await this.loadModel();
    this.animate();
    window.addEventListener('resize', () => this.onResize());
  }

  private async initThree() {
    const canvas = this.canvasRef.nativeElement;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);

    this.camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 1, 3);

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Lumière
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(2, 2, 2);
    this.scene.add(directionalLight);

    // Contrôles (import dynamique)
    // @ts-ignore
    const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls');
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.target.set(0, 1, 0);
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
      },
      undefined,
      (error: any) => {
        console.error('Erreur lors du chargement du modèle 3D :', error);
      }
    );
  }

  private animate = () => {
    requestAnimationFrame(this.animate);
    if (this.controls) this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  private onResize() {
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }
}
