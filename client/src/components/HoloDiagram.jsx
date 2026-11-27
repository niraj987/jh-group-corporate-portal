import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const COBALT = 0x5b7cff;
const MINT = 0x45e0ad;
const COPPER = 0xff9057;
const ICE = 0xb9c8ff;
const DEEP = 0x1b2b6b;

const lineMaterial = (color, opacity) =>
  new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

const dotMaterial = (color, size, opacity) =>
  new THREE.PointsMaterial({
    color,
    size,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true
  });

/* 01 — signal field: a drifting particle cloud over three interference ribbons */
function buildSignal() {
  const group = new THREE.Group();

  const count = 1200;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 17;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 9;
  }
  const cloudGeometry = new THREE.BufferGeometry();
  cloudGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const cloud = new THREE.Points(cloudGeometry, dotMaterial(ICE, 0.05, 0.6));
  group.add(cloud);

  const specs = [
    { color: COBALT, y: -0.1, opacity: 0.5, speed: 0.85, amp: 0.6, tilt: -Math.PI / 2.45 },
    { color: MINT, y: 0.75, opacity: 0.32, speed: 1.2, amp: 0.42, tilt: -Math.PI / 2.7 },
    { color: COPPER, y: -1.15, opacity: 0.3, speed: 0.65, amp: 0.75, tilt: -Math.PI / 2.25 }
  ];

  const waves = specs.map((spec, index) => {
    const geometry = new THREE.PlaneGeometry(13.5, 7, 84, 24);
    const material = new THREE.MeshBasicMaterial({
      color: spec.color,
      wireframe: true,
      transparent: true,
      opacity: spec.opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = spec.tilt;
    mesh.position.set(0, spec.y, index * -0.4);
    group.add(mesh);
    return { mesh, spec, phase: index * 1.9 };
  });

  const scanGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-7, -3.2, 2),
    new THREE.Vector3(7, 3.2, 2)
  ]);
  const scan = new THREE.Line(scanGeometry, lineMaterial(MINT, 0.28));
  group.add(scan);

  group.position.z = -1.2;

  return {
    object: group,
    camera: 7.6,
    spin: 0.0009,
    update(t) {
      waves.forEach(({ mesh, spec, phase }) => {
        const attr = mesh.geometry.attributes.position;
        for (let i = 0; i < attr.count; i += 1) {
          const x = attr.getX(i);
          const y = attr.getY(i);
          attr.setZ(
            i,
            Math.sin(x * 0.85 + t * spec.speed + phase) * spec.amp +
              Math.sin(y * 0.75 + t * spec.speed * 0.6 + phase) * spec.amp * 0.7
          );
        }
        attr.needsUpdate = true;
      });
      cloud.rotation.y = t * 0.014;
      cloud.rotation.z = Math.sin(t * 0.08) * 0.04;
      scan.position.y = Math.sin(t * 0.5) * 3;
    }
  };
}

/* 02 — order book: bid/ask depth stems and skewed cumulative tops */
function buildOrderbook() {
  const group = new THREE.Group();
  const columns = 30;
  const baseline = -2;
  const span = 10.8;
  const xs = Array.from({ length: columns }, (_, i) => -span / 2 + (span * i) / (columns - 1));

  const grid = new THREE.GridHelper(13, 26, COBALT, DEEP);
  grid.material.transparent = true;
  grid.material.opacity = 0.28;
  grid.material.depthWrite = false;
  grid.position.y = baseline;
  group.add(grid);

  const baseHeights = xs.map((x) => {
    const distance = Math.abs(x) / (span / 2);
    const skew = x < 0 ? 1 : 0.86;
    return (0.3 + 2.25 * Math.pow(distance, 1.55) * skew) * (0.72 + Math.random() * 0.5);
  });

  const stemPositions = new Float32Array(columns * 2 * 3);
  const stemGeometry = new THREE.BufferGeometry();
  stemGeometry.setAttribute('position', new THREE.BufferAttribute(stemPositions, 3));
  const stems = new THREE.LineSegments(stemGeometry, lineMaterial(COBALT, 0.45));
  group.add(stems);

  const topPositions = new Float32Array(columns * 3);
  const topColors = new Float32Array(columns * 3);
  const cobalt = new THREE.Color(COBALT);
  const copper = new THREE.Color(COPPER);
  xs.forEach((x, i) => {
    const colour = x < 0 ? cobalt : copper;
    topColors[i * 3] = colour.r;
    topColors[i * 3 + 1] = colour.g;
    topColors[i * 3 + 2] = colour.b;
  });
  const topGeometry = new THREE.BufferGeometry();
  topGeometry.setAttribute('position', new THREE.BufferAttribute(topPositions, 3));
  topGeometry.setAttribute('color', new THREE.BufferAttribute(topColors, 3));
  const topLine = new THREE.Line(
    topGeometry,
    new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  group.add(topLine);

  const caps = new THREE.Points(
    topGeometry,
    dotMaterial(ICE, 0.06, 0.85)
  );
  group.add(caps);

  group.rotation.y = -0.45;
  group.position.y = -0.2;

  return {
    object: group,
    camera: 7.2,
    spin: 0.0014,
    update(t) {
      xs.forEach((x, i) => {
        const height = baseHeights[i] * (1 + 0.11 * Math.sin(t * 1.1 + i * 0.35));
        const z = -Math.abs(x) * 0.09;
        const y = baseline + height;

        stemPositions.set([x, baseline, z, x, y, z], i * 6);
        topPositions.set([x, y, z], i * 3);
      });
      stemGeometry.attributes.position.needsUpdate = true;
      topGeometry.attributes.position.needsUpdate = true;
      topGeometry.attributes.color.needsUpdate = true;
    }
  };
}

/* 03 — agent network: consensus graph with pulsing edges */
function buildNetwork() {
  const group = new THREE.Group();
  const nodes = 36;
  const points = [];

  for (let i = 0; i < nodes; i += 1) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = 1.15 + Math.random() * 1.5;
    points.push(
      new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta) * 1.35,
        radius * Math.cos(phi) * 0.95,
        radius * Math.sin(phi) * Math.sin(theta)
      )
    );
  }

  const nodePositions = new Float32Array(nodes * 3);
  points.forEach((p, i) => nodePositions.set([p.x, p.y, p.z], i * 3));
  const nodeGeometry = new THREE.BufferGeometry();
  nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
  group.add(new THREE.Points(nodeGeometry, dotMaterial(ICE, 0.075, 0.85)));

  const hubGeometry = new THREE.BufferGeometry().setFromPoints([points[0], points[7], points[19]]);
  group.add(new THREE.Points(hubGeometry, dotMaterial(COPPER, 0.16, 0.9)));

  const edges = [];
  for (let i = 0; i < nodes; i += 1) {
    for (let j = i + 1; j < nodes; j += 1) {
      if (points[i].distanceTo(points[j]) < 1.65) edges.push(points[i], points[j]);
    }
  }
  const edgeGeometry = new THREE.BufferGeometry().setFromPoints(edges);
  const edgeMaterial = lineMaterial(COBALT, 0.3);
  group.add(new THREE.LineSegments(edgeGeometry, edgeMaterial));

  const ringGeometry = new THREE.BufferGeometry().setFromPoints(
    Array.from({ length: 128 }, (_, i) => {
      const angle = (i / 128) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(angle) * 3.1, 0, Math.sin(angle) * 3.1);
    })
  );
  const ring = new THREE.LineLoop(ringGeometry, lineMaterial(MINT, 0.22));
  ring.rotation.x = Math.PI / 2.6;
  group.add(ring);

  return {
    object: group,
    camera: 7.4,
    spin: 0.0016,
    update(t) {
      edgeMaterial.opacity = 0.18 + 0.16 * (Math.sin(t * 0.9) * 0.5 + 0.5);
      ring.rotation.z = t * 0.06;
      group.position.y = Math.sin(t * 0.35) * 0.12;
    }
  };
}

/* 04 — IRB lattice: exposure rings, risk lattice and radial spokes */
function buildLattice() {
  const group = new THREE.Group();

  const rings = [
    { radius: 2.85, color: COBALT, opacity: 0.5, tilt: [0.25, 0, 0.12] },
    { radius: 2.15, color: MINT, opacity: 0.38, tilt: [-0.5, 0.3, 0] },
    { radius: 1.45, color: COPPER, opacity: 0.4, tilt: [2.9, 0.15, 0.4] }
  ];

  const ringObjects = rings.map((ring) => {
    const geometry = new THREE.BufferGeometry().setFromPoints(
      Array.from({ length: 120 }, (_, i) => {
        const angle = (i / 120) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(angle) * ring.radius, 0, Math.sin(angle) * ring.radius);
      })
    );
    const line = new THREE.LineLoop(geometry, lineMaterial(ring.color, ring.opacity));
    line.rotation.set(...ring.tilt);
    group.add(line);
    return line;
  });

  const lattice = [];
  const step = 0.62;
  for (let x = -3; x <= 3; x += step) {
    for (let y = -3; y <= 3; y += step) {
      for (let z = -3; z <= 3; z += step) {
        const radius = Math.sqrt(x * x + y * y + z * z);
        if (radius < 2.6 && radius > 0.55 && Math.random() > 0.45) {
          lattice.push(new THREE.Vector3(x, y, z));
        }
      }
    }
  }
  const latticeGeometry = new THREE.BufferGeometry().setFromPoints(lattice);
  group.add(new THREE.Points(latticeGeometry, dotMaterial(ICE, 0.055, 0.55)));

  const spokes = [];
  for (let i = 0; i < 26; i += 1) {
    const angle = (i / 26) * Math.PI * 2;
    spokes.push(new THREE.Vector3(0, 0, 0));
    spokes.push(new THREE.Vector3(Math.cos(angle) * 2.9, Math.sin(angle) * 0.9, Math.sin(angle) * 2.9));
  }
  const spokeGeometry = new THREE.BufferGeometry().setFromPoints(spokes);
  group.add(new THREE.LineSegments(spokeGeometry, lineMaterial(COBALT, 0.2)));

  const core = new THREE.Points(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0)]),
    dotMaterial(MINT, 0.24, 0.95)
  );
  group.add(core);

  return {
    object: group,
    camera: 7.8,
    spin: 0.0011,
    update(t) {
      ringObjects.forEach((ring, i) => {
        ring.rotation.y += 0.0009 + i * 0.0004;
        ring.rotation.x = rings[i].tilt[0] + Math.sin(t * 0.25 + i) * 0.08;
      });
      group.position.y = Math.sin(t * 0.4) * 0.1;
    }
  };
}

const BUILDERS = {
  signal: buildSignal,
  orderbook: buildOrderbook,
  network: buildNetwork,
  lattice: buildLattice
};

export default function HoloDiagram({ variant = 'signal', className = '', interactive = true }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const built = (BUILDERS[variant] || BUILDERS.signal)();

    scene.add(built.object);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0.85, built.camera || 7.4);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setClearAlpha(0);

    const resize = () => {
      const { width, height } = wrap.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();

    const observer =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => resize()) : null;
    observer?.observe(wrap);

    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onPointerMove = (event) => {
      const rect = wrap.getBoundingClientRect();
      target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onPointerLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    if (interactive && !reduced) {
      wrap.addEventListener('pointermove', onPointerMove);
      wrap.addEventListener('pointerleave', onPointerLeave);
    }

    const startedAt = performance.now();
    let spin = built.object.rotation.y || 0;
    let raf = 0;
    let running = false;

    const paint = () => {
      const t = (performance.now() - startedAt) / 1000;
      built.update?.(t);
      pointer.x += (target.x - pointer.x) * 0.05;
      pointer.y += (target.y - pointer.y) * 0.05;
      spin += built.spin ?? 0.0012;
      built.object.rotation.y = spin + pointer.x * 0.22;
      built.object.rotation.x = pointer.y * 0.12;
      renderer.render(scene, camera);
    };

    const loop = () => {
      if (!running) return;
      paint();
      raf = requestAnimationFrame(loop);
    };

    const setRunning = (next) => {
      if (next === running) return;
      running = next;
      if (next) {
        raf = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    resize();
    paint();

    if (reduced) {
      setRunning(false);
    } else {
      const intersection = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => setRunning(entry.isIntersecting && !document.hidden));
        },
        { rootMargin: '140px' }
      );
      intersection.observe(wrap);

      const onVisibility = () => setRunning(!document.hidden);
      document.addEventListener('visibilitychange', onVisibility);

      return () => {
        running = false;
        cancelAnimationFrame(raf);
        intersection.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);
        observer?.disconnect();
        wrap.removeEventListener('pointermove', onPointerMove);
        wrap.removeEventListener('pointerleave', onPointerLeave);
        scene.traverse((object) => {
          object.geometry?.dispose();
          const materials = object.material
            ? Array.isArray(object.material)
              ? object.material
              : [object.material]
            : [];
          materials.forEach((material) => material.dispose());
        });
        renderer.dispose();
      };
    }

    return () => {
      observer?.disconnect();
      wrap.removeEventListener('pointermove', onPointerMove);
      wrap.removeEventListener('pointerleave', onPointerLeave);
      scene.traverse((object) => {
        object.geometry?.dispose();
        const materials = object.material
          ? Array.isArray(object.material)
            ? object.material
            : [object.material]
          : [];
        materials.forEach((material) => material.dispose());
      });
      renderer.dispose();
    };
  }, [variant, interactive]);

  return (
    <div ref={wrapRef} className={`holo-frame ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="holo-canvas" />
      <div className="holo-scan" />
    </div>
  );
}
