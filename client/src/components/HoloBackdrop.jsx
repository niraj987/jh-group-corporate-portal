import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* A faint, always-alive data constellation behind the page. */
export default function HoloBackdrop() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    const group = new THREE.Group();
    group.position.set(2.6, 1.2, 0);
    scene.add(group);

    const count = 320;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const cloudGeometry = new THREE.BufferGeometry();
    cloudGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const cloud = new THREE.Points(
      cloudGeometry,
      new THREE.PointsMaterial({
        color: 0x1f30d8,
        size: 0.078,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
        sizeAttenuation: true
      })
    );
    group.add(cloud);

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(2.9, 20, 14),
      new THREE.MeshBasicMaterial({
        color: 0x1f30d8,
        wireframe: true,
        transparent: true,
        opacity: 0.14,
        depthWrite: false
      })
    );
    group.add(sphere);

    const ringGeometry = new THREE.BufferGeometry().setFromPoints(
      Array.from({ length: 160 }, (_, i) => {
        const angle = (i / 160) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(angle) * 3.4, 0, Math.sin(angle) * 3.4);
      })
    );
    const ring = new THREE.LineLoop(
      ringGeometry,
      new THREE.LineBasicMaterial({ color: 0xc0561f, transparent: true, opacity: 0.24 })
    );
    ring.rotation.set(0.9, 0.2, 0.35);
    group.add(ring);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setClearAlpha(0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    let raf = 0;
    let scrollY = window.scrollY;

    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const paint = (elapsed) => {
      cloud.rotation.y = elapsed * 0.012;
      cloud.rotation.x = Math.sin(elapsed * 0.06) * 0.06;
      sphere.rotation.y = elapsed * 0.02;
      sphere.rotation.x = elapsed * 0.008;
      ring.rotation.z = 0.35 + elapsed * 0.03;
      group.position.y = 1.1 - scrollY * 0.0009;
      renderer.render(scene, camera);
    };

    paint(0);

    if (!reduced) {
      const startedAt = performance.now();
      const loop = () => {
        paint((performance.now() - startedAt) / 1000);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      cloudGeometry.dispose();
      cloud.material.dispose();
      sphere.geometry.dispose();
      sphere.material.dispose();
      ringGeometry.dispose();
      ring.material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="holo-backdrop" aria-hidden="true" />;
}
