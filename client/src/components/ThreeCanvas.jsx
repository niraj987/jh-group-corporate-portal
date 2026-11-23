import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // --- 1. Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    currentMount.appendChild(renderer.domElement);

    // --- 2. 3D Floating Geometry Models (Quantitative Financial Lattice) ---
    // A. Central Multi-Faceted Icosahedron (Lattice Core)
    const icosaGeometry = new THREE.IcosahedronGeometry(7, 1);
    const icosaWireframe = new THREE.WireframeGeometry(icosaGeometry);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x8b5cf6, // Vibrant Royal Purple
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const icosahedronLines = new THREE.LineSegments(icosaWireframe, lineMaterial);
    scene.add(icosahedronLines);

    // B. Inner Quantum Core (Sapphire Blue)
    const coreGeometry = new THREE.OctahedronGeometry(4, 0);
    const coreMaterial = new THREE.MeshPhongMaterial({
      color: 0x3b82f6, // Sapphire Blue
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.4,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);

    // C. Orbiting Algorithmic Torus Rings (Silver & Cosmic Blue)
    const torusGeometry = new THREE.TorusGeometry(12, 0.15, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x93c5fd, // Light Silver-Blue
      transparent: true,
      opacity: 0.25,
      wireframe: true
    });
    const torusRing1 = new THREE.Mesh(torusGeometry, torusMaterial);
    torusRing1.rotation.x = Math.PI / 3;
    torusRing1.rotation.y = Math.PI / 6;
    scene.add(torusRing1);

    const torusGeometry2 = new THREE.TorusGeometry(15, 0.1, 16, 120);
    const torusMaterial2 = new THREE.MeshBasicMaterial({
      color: 0xc084fc, // Soft Violet-Silver
      transparent: true,
      opacity: 0.2,
      wireframe: true
    });
    const torusRing2 = new THREE.Mesh(torusGeometry2, torusMaterial2);
    torusRing2.rotation.x = -Math.PI / 4;
    scene.add(torusRing2);

    // --- 3. 3D Constellation Particle Field ---
    const particlesCount = 900;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    // Color gradient across particles: Silver, Blue, Purple
    const colorPalette = [
      new THREE.Color(0xe2e8f0), // Metallic Silver
      new THREE.Color(0x38bdf8), // Light Blue
      new THREE.Color(0x818cf8), // Indigo
      new THREE.Color(0xc084fc)  // Amethyst Purple
    ];

    for (let i = 0; i < particlesCount; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 80;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 80;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 60;

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colorArray[i * 3] = c.r;
      colorArray[i * 3 + 1] = c.g;
      colorArray[i * 3 + 2] = c.b;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // --- 4. Lights ---
    const ambientLight = new THREE.AmbientLight(0x4338ca, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xa855f7, 2.5, 60);
    pointLight1.position.set(15, 12, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x3b82f6, 2.5, 60);
    pointLight2.position.set(-15, -12, 10);
    scene.add(pointLight2);

    // --- 5. Interactive Mouse & Scroll Parallax ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // --- 6. Responsive Window Resize ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // --- 7. Animation Loop ---
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate geometric models
      icosahedronLines.rotation.x = elapsedTime * 0.08 + targetY * 0.4;
      icosahedronLines.rotation.y = elapsedTime * 0.12 + targetX * 0.4;

      coreMesh.rotation.x = -elapsedTime * 0.15;
      coreMesh.rotation.z = elapsedTime * 0.18;

      torusRing1.rotation.z = elapsedTime * 0.05;
      torusRing1.rotation.y = elapsedTime * 0.07 + targetX * 0.2;

      torusRing2.rotation.z = -elapsedTime * 0.04;
      torusRing2.rotation.x = -elapsedTime * 0.06 + targetY * 0.2;

      // Gently rotate particle starfield
      particlesMesh.rotation.y = elapsedTime * 0.02;
      particlesMesh.rotation.x = targetY * 0.1;

      // Parallax camera sway
      camera.position.x = targetX * 2.5;
      camera.position.y = -targetY * 2.5;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      icosaGeometry.dispose();
      torusGeometry.dispose();
      torusGeometry2.dispose();
      particlesGeometry.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.35 }}
    />
  );
}
