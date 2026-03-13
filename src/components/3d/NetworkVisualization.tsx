"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ──────────────────────────── constants ──────────────────────────── */

const PARTICLE_COUNT = 260;
const CONNECTION_DISTANCE = 2.0;
const CONNECTION_OPACITY = 0.07;
const MOUSE_REPEL_RADIUS = 3.0;
const MOUSE_REPEL_STRENGTH = 0.04;
const SCENE_ROTATION_SPEED = 0.001;
const SPREAD_X = 10;
const SPREAD_Y = 4;
const SPREAD_Z = 4;

/* palette */
const COLOR_MINT = new THREE.Color("#1CF2C7");
const COLOR_VIOLET = new THREE.Color("#7A5CFF");
const COLOR_CYAN = new THREE.Color("#46CFFF");

/* ─────────────────── deterministic pseudo-random ─────────────────── */

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* ─────────────── simple 3D simplex-ish value noise ───────────────── */

function hash(x: number, y: number, z: number): number {
  let h = x * 374761393 + y * 668265263 + z * 1274126177;
  h = ((h ^ (h >> 13)) * 1103515245) | 0;
  return ((h ^ (h >> 16)) & 0x7fffffff) / 0x7fffffff;
}

function smoothNoise(x: number, y: number, z: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const iz = Math.floor(z);
  const fx = x - ix;
  const fy = y - iy;
  const fz = z - iz;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const sz = fz * fz * (3 - 2 * fz);

  const n000 = hash(ix, iy, iz);
  const n100 = hash(ix + 1, iy, iz);
  const n010 = hash(ix, iy + 1, iz);
  const n110 = hash(ix + 1, iy + 1, iz);
  const n001 = hash(ix, iy, iz + 1);
  const n101 = hash(ix + 1, iy, iz + 1);
  const n011 = hash(ix, iy + 1, iz + 1);
  const n111 = hash(ix + 1, iy + 1, iz + 1);

  const nx00 = n000 + sx * (n100 - n000);
  const nx10 = n010 + sx * (n110 - n010);
  const nx01 = n001 + sx * (n101 - n001);
  const nx11 = n011 + sx * (n111 - n011);

  const nxy0 = nx00 + sy * (nx10 - nx00);
  const nxy1 = nx01 + sy * (nx11 - nx01);

  return nxy0 + sz * (nxy1 - nxy0);
}

function fbm(x: number, y: number, z: number): number {
  return (
    smoothNoise(x, y, z) * 0.5 +
    smoothNoise(x * 2, y * 2, z * 2) * 0.3 +
    smoothNoise(x * 4, y * 4, z * 4) * 0.2
  );
}

/* ────────────────── color interpolation by x-position ────────────── */

function getParticleColor(x: number, target: THREE.Color): void {
  const nx = x / SPREAD_X; // normalise roughly to -1..1

  if (nx < -0.15) {
    // left zone: mint → violet
    const t = THREE.MathUtils.smoothstep(nx, -1.0, -0.15);
    target.copy(COLOR_MINT).lerp(COLOR_VIOLET, t);
  } else if (nx > 0.15) {
    // right zone: violet → cyan
    const t = THREE.MathUtils.smoothstep(nx, 0.15, 1.0);
    target.copy(COLOR_VIOLET).lerp(COLOR_CYAN, t);
  } else {
    // centre zone: ultraviolet
    target.copy(COLOR_VIOLET);
  }
}

/* ═══════════════════════════ PARTICLE NETWORK ═══════════════════════ */

function ParticleNetwork() {
  const groupRef = useRef<THREE.Group>(null!);
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  /* pointer in world space (updated via raycaster-free approach) */
  const pointer = useRef(new THREE.Vector2(9999, 9999));
  const pointerWorld = useRef(new THREE.Vector3(9999, 9999, 0));

  /* ── initialise particle data ── */
  const { positions, velocities, basePositions, sizes, colors } =
    useMemo(() => {
      const rand = seededRandom(42);
      const pos = new Float32Array(PARTICLE_COUNT * 3);
      const vel = new Float32Array(PARTICLE_COUNT * 3);
      const base = new Float32Array(PARTICLE_COUNT * 3);
      const sz = new Float32Array(PARTICLE_COUNT);
      const col = new Float32Array(PARTICLE_COUNT * 3);

      const tmpColor = new THREE.Color();

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        /* distribute particles biased towards a horizontal band */
        const x = (rand() - 0.5) * SPREAD_X * 2;
        const y = (rand() - 0.5) * SPREAD_Y * 2;
        const z = (rand() - 0.5) * SPREAD_Z * 2;

        pos[i3] = x;
        pos[i3 + 1] = y;
        pos[i3 + 2] = z;
        base[i3] = x;
        base[i3 + 1] = y;
        base[i3 + 2] = z;

        /* initial velocity: gentle rightward drift */
        vel[i3] = 0.002 + rand() * 0.004;
        vel[i3 + 1] = 0;
        vel[i3 + 2] = 0;

        /* size */
        sz[i] = 0.02 + rand() * 0.04;

        /* color */
        getParticleColor(x, tmpColor);
        col[i3] = tmpColor.r;
        col[i3 + 1] = tmpColor.g;
        col[i3 + 2] = tmpColor.b;
      }

      return {
        positions: pos,
        velocities: vel,
        basePositions: base,
        sizes: sz,
        colors: col,
      };
    }, []);

  /* ── connection lines buffer (pre-allocated, max possible pairs) ── */
  const maxLines = PARTICLE_COUNT * 12; // generous upper bound of connections
  const linePositions = useMemo(
    () => new Float32Array(maxLines * 6),
    [maxLines]
  );
  const lineColors = useMemo(
    () => new Float32Array(maxLines * 6),
    [maxLines]
  );

  /* ── particle material (custom shader for additive glow) ── */
  const particleMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      uniforms: {
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: /* glsl */ `
        attribute float aSize;
        varying vec3 vColor;
        uniform float uPixelRatio;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * uPixelRatio * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          /* soft radial glow */
          float strength = 1.0 - smoothstep(0.0, 0.5, d);
          strength = pow(strength, 1.5);
          gl_FragColor = vec4(vColor, strength * 0.85);
        }
      `,
    });
  }, []);

  /* ── line material ── */
  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: CONNECTION_OPACITY,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  /* ── track mouse ── */
  const onPointerMove = useCallback(
    (e: { clientX: number; clientY: number }) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    },
    []
  );

  /* attach listener once */
  const listenerAttached = useRef(false);
  if (typeof window !== "undefined" && !listenerAttached.current) {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    listenerAttached.current = true;
  }

  /* ══════════════════════════ FRAME LOOP ═════════════════════════════ */

  const tmpColor = useMemo(() => new THREE.Color(), []);

  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();

    /* unproject pointer to world z=0 plane */
    const pw = pointerWorld.current;
    pw.set(pointer.current.x, pointer.current.y, 0.5);
    pw.unproject(camera);
    const dir = pw.sub(camera.position).normalize();
    const dist = -camera.position.z / dir.z;
    pw.copy(camera.position).add(dir.multiplyScalar(dist));

    const posAttr = pointsRef.current?.geometry?.attributes
      ?.position as THREE.BufferAttribute;
    const colAttr = pointsRef.current?.geometry?.attributes
      ?.color as THREE.BufferAttribute;
    if (!posAttr || !colAttr) return;

    const posArr = posAttr.array as Float32Array;
    const colArr = colAttr.array as Float32Array;

    /* ── update each particle ── */
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      let x = posArr[i3];
      let y = posArr[i3 + 1];
      let z = posArr[i3 + 2];

      /* rightward drift */
      x += velocities[i3];

      /* wrap: when particle drifts far right, reset to left */
      if (x > SPREAD_X + 1) {
        x = -SPREAD_X - 1;
        basePositions[i3] = x;
      }

      /* vertical oscillation */
      const oscPhase = basePositions[i3] * 0.3 + i * 0.05;
      y = basePositions[i3 + 1] + Math.sin(t * 0.4 + oscPhase) * 0.3;

      /* depth oscillation */
      z =
        basePositions[i3 + 2] +
        Math.sin(t * 0.25 + oscPhase * 1.3) * 0.2;

      /* ── centre zone chaos (the "veil") ── */
      const absX = Math.abs(x);
      if (absX < 3.5) {
        const chaosIntensity = 1.0 - absX / 3.5; // strongest at centre
        const noiseScale = 0.35;
        const nx = fbm(
          x * noiseScale + t * 0.15,
          y * noiseScale,
          z * noiseScale
        );
        const ny = fbm(
          y * noiseScale,
          z * noiseScale + t * 0.15,
          x * noiseScale
        );
        const nz = fbm(
          z * noiseScale,
          x * noiseScale,
          y * noiseScale + t * 0.15
        );
        x += (nx - 0.5) * chaosIntensity * 0.08;
        y += (ny - 0.5) * chaosIntensity * 0.08;
        z += (nz - 0.5) * chaosIntensity * 0.06;
      }

      /* ── mouse repulsion ── */
      const dx = x - pw.x;
      const dy = y - pw.y;
      const dSq = dx * dx + dy * dy;
      if (dSq < MOUSE_REPEL_RADIUS * MOUSE_REPEL_RADIUS && dSq > 0.001) {
        const d = Math.sqrt(dSq);
        const force =
          MOUSE_REPEL_STRENGTH * (1.0 - d / MOUSE_REPEL_RADIUS);
        x += (dx / d) * force;
        y += (dy / d) * force;
      }

      posArr[i3] = x;
      posArr[i3 + 1] = y;
      posArr[i3 + 2] = z;

      /* update base X to follow drift */
      basePositions[i3] += velocities[i3];
      if (basePositions[i3] > SPREAD_X + 1) {
        basePositions[i3] = -SPREAD_X - 1;
      }

      /* ── color by position ── */
      getParticleColor(x, tmpColor);
      colArr[i3] = tmpColor.r;
      colArr[i3 + 1] = tmpColor.g;
      colArr[i3 + 2] = tmpColor.b;
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;

    /* ══════════════ CONNECTION LINES ══════════════ */
    let lineIdx = 0;
    const linePos = linePositions;
    const lineCol = lineColors;
    const c1 = new THREE.Color();
    const c2 = new THREE.Color();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const ax = posArr[i3];
      const ay = posArr[i3 + 1];
      const az = posArr[i3 + 2];

      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const j3 = j * 3;
        const bx = posArr[j3];
        const by = posArr[j3 + 1];
        const bz = posArr[j3 + 2];

        const ddx = ax - bx;
        const ddy = ay - by;
        const ddz = az - bz;
        const distSq = ddx * ddx + ddy * ddy + ddz * ddz;

        if (distSq < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
          if (lineIdx >= maxLines) break;
          const li = lineIdx * 6;

          linePos[li] = ax;
          linePos[li + 1] = ay;
          linePos[li + 2] = az;
          linePos[li + 3] = bx;
          linePos[li + 4] = by;
          linePos[li + 5] = bz;

          /* line color = average of endpoint colors, faded by distance */
          const fade =
            1.0 -
            Math.sqrt(distSq) / CONNECTION_DISTANCE;
          getParticleColor(ax, c1);
          getParticleColor(bx, c2);
          c1.lerp(c2, 0.5);

          lineCol[li] = c1.r * fade;
          lineCol[li + 1] = c1.g * fade;
          lineCol[li + 2] = c1.b * fade;
          lineCol[li + 3] = c1.r * fade;
          lineCol[li + 4] = c1.g * fade;
          lineCol[li + 5] = c1.b * fade;

          lineIdx++;
        }
      }
      if (lineIdx >= maxLines) break;
    }

    /* update line geometry */
    const lineGeo = linesRef.current?.geometry;
    if (lineGeo) {
      const lp = lineGeo.attributes.position as THREE.BufferAttribute;
      const lc = lineGeo.attributes.color as THREE.BufferAttribute;
      (lp.array as Float32Array).set(linePos);
      (lc.array as Float32Array).set(lineCol);
      lineGeo.setDrawRange(0, lineIdx * 2);
      lp.needsUpdate = true;
      lc.needsUpdate = true;
    }

    /* ── slow scene rotation ── */
    if (groupRef.current) {
      groupRef.current.rotation.y += SCENE_ROTATION_SPEED;
    }

    /* ── centre glow pulse ── */
    if (glowRef.current) {
      const scale = 1.0 + Math.sin(t * 0.5) * 0.08;
      glowRef.current.scale.set(scale, scale, 1);
      (glowRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = t;
    }
  });

  /* ── glow shader for the centre "veil" ── */
  const glowMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color("#7A5CFF") },
        },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform float uTime;
          uniform vec3 uColor;
          varying vec2 vUv;
          void main() {
            float d = length(vUv - 0.5) * 2.0;
            float strength = 1.0 - smoothstep(0.0, 1.0, d);
            strength = pow(strength, 3.0);
            /* subtle shimmer */
            strength *= 0.12 + 0.03 * sin(uTime * 0.8 + vUv.y * 6.0);
            gl_FragColor = vec4(uColor, strength);
          }
        `,
      }),
    []
  );

  return (
    <group ref={groupRef}>
      {/* particles */}
      <points ref={pointsRef} material={particleMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={PARTICLE_COUNT}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
            count={PARTICLE_COUNT}
          />
          <bufferAttribute
            attach="attributes-aSize"
            args={[sizes, 1]}
            count={PARTICLE_COUNT}
          />
        </bufferGeometry>
      </points>

      {/* connection lines */}
      <lineSegments ref={linesRef} material={lineMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={maxLines * 2}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
            count={maxLines * 2}
          />
        </bufferGeometry>
      </lineSegments>

      {/* centre veil glow */}
      <mesh ref={glowRef} position={[0, 0, -1]} material={glowMaterial}>
        <planeGeometry args={[7, 8]} />
      </mesh>
    </group>
  );
}

/* ═════════════════════════ EXPORTED COMPONENT ════════════════════════ */

export default function NetworkVisualization() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <ParticleNetwork />
      </Canvas>
    </div>
  );
}
