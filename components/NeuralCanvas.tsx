'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface NeuralCanvasProps {
  isDark: boolean;
}

export default function NeuralCanvas({ isDark }: NeuralCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer | null = null;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 7;

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

      const particleCount = window.innerWidth < 768 ? 50 : 90;
      const positions = new Float32Array(particleCount * 3);
      const velocities: { x: number; y: number; z: number }[] = [];

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 16;
        positions[i + 1] = (Math.random() - 0.5) * 16;
        positions[i + 2] = (Math.random() - 0.5) * 12;

        velocities.push({
          x: (Math.random() - 0.5) * 0.003,
          y: (Math.random() - 0.5) * 0.003,
          z: (Math.random() - 0.5) * 0.003,
        });
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const particleColor = isDark ? 0x38bdf8 : 0x0284c7;
      const material = new THREE.PointsMaterial({
        color: particleColor,
        size: 0.1,
        transparent: true,
        opacity: isDark ? 0.6 : 0.45,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // Line connections geometry
      const maxConnections = 120;
      const linePositions = new Float32Array(maxConnections * 6);
      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(linePositions, 3)
      );

      const lineMaterial = new THREE.LineBasicMaterial({
        color: particleColor,
        transparent: true,
        opacity: isDark ? 0.15 : 0.08,
      });

      const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(linesMesh);

      let mouseX = 0;
      let mouseY = 0;

      const handleMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      const handleResize = () => {
        if (!renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      const animate = () => {
        const pos = geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          pos[idx] += velocities[i].x;
          pos[idx + 1] += velocities[i].y;
          pos[idx + 2] += velocities[i].z;

          if (Math.abs(pos[idx]) > 9) velocities[i].x *= -1;
          if (Math.abs(pos[idx + 1]) > 9) velocities[i].y *= -1;
          if (Math.abs(pos[idx + 2]) > 7) velocities[i].z *= -1;
        }
        geometry.attributes.position.needsUpdate = true;

        // Dynamic line segment connections
        let lineIdx = 0;
        const linePos = lineGeometry.attributes.position.array as Float32Array;
        const connectionDistSq = 3.8 * 3.8;

        for (let i = 0; i < particleCount && lineIdx < maxConnections; i++) {
          const p1x = pos[i * 3];
          const p1y = pos[i * 3 + 1];
          const p1z = pos[i * 3 + 2];

          for (let j = i + 1; j < particleCount && lineIdx < maxConnections; j++) {
            const dx = p1x - pos[j * 3];
            const dy = p1y - pos[j * 3 + 1];
            const dz = p1z - pos[j * 3 + 2];
            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq < connectionDistSq) {
              const startIdx = lineIdx * 6;
              linePos[startIdx] = p1x;
              linePos[startIdx + 1] = p1y;
              linePos[startIdx + 2] = p1z;
              linePos[startIdx + 3] = pos[j * 3];
              linePos[startIdx + 4] = pos[j * 3 + 1];
              linePos[startIdx + 5] = pos[j * 3 + 2];
              lineIdx++;
            }
          }
        }
        lineGeometry.attributes.position.needsUpdate = true;
        lineGeometry.setDrawRange(0, lineIdx * 2);

        // Camera gentle easing
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        if (renderer) {
          renderer.render(scene, camera);
        }
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        geometry.dispose();
        material.dispose();
        lineGeometry.dispose();
        lineMaterial.dispose();
        renderer?.dispose();
      };
    } catch {
      // Fallback gracefully if WebGL is unsupported or disabled
      return () => {};
    }
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 w-full h-full opacity-60 dark:opacity-75 transition-opacity"
      aria-hidden="true"
    />
  );
}
