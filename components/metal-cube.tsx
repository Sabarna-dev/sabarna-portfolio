"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function MetalCube() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ active: false, x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 9.2);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const cube = new THREE.Group();
    const cubieGeometry = new THREE.BoxGeometry(0.88, 0.88, 0.88);
    const metalTextures: THREE.CanvasTexture[] = [];
    const random = (seed: number) => {
      const value = Math.sin(seed * 12.9898) * 43758.5453;
      return value - Math.floor(value);
    };
    const createTexture = (pattern: "grain" | "brushed" | "perforated" | "satin", seed: number) => {
      const textureCanvas = document.createElement("canvas");
      textureCanvas.width = 128;
      textureCanvas.height = 128;
      const textureContext = textureCanvas.getContext("2d");
      if (!textureContext) return null;
      textureContext.fillStyle = pattern === "satin" ? "#66736c" : pattern === "perforated" ? "#050707" : "#242c28";
      textureContext.fillRect(0, 0, 128, 128);

      if (pattern === "perforated") {
        textureContext.fillStyle = "#050707";
        textureContext.fillRect(0, 0, 128, 128);
        textureContext.fillStyle = "#c6d0c9";
        for (let y = 4; y < 132; y += 9) {
          for (let x = 4; x < 132; x += 9) {
            textureContext.beginPath();
            textureContext.arc(x + (y % 18 ? 4.5 : 0), y, 2.65, 0, Math.PI * 2);
            textureContext.fill();
            textureContext.fillStyle = "#252c28";
            textureContext.beginPath();
            textureContext.arc(x + (y % 18 ? 4.5 : 0), y, 1.15, 0, Math.PI * 2);
            textureContext.fill();
            textureContext.fillStyle = "#c6d0c9";
          }
        }
      } else if (pattern === "brushed") {
        for (let y = 0; y < 128; y += 3) {
          const shade = 82 + Math.floor(random(seed + y) * 66);
          textureContext.strokeStyle = `rgba(${shade + 8}, ${shade + 12}, ${shade + 10}, .82)`;
          textureContext.lineWidth = 1 + random(seed + y + 1) * 1.4;
          textureContext.beginPath();
          textureContext.moveTo(0, y + random(seed + y) * 2);
          textureContext.lineTo(128, y + random(seed + y + 1) * 2);
          textureContext.stroke();
        }
      } else {
        for (let index = 0; index < 1800; index += 1) {
          const shade = pattern === "satin" ? 125 : 55 + Math.floor(random(seed + index) * 72);
          textureContext.fillStyle = `rgba(${shade}, ${shade + 5}, ${shade + 3}, ${pattern === "satin" ? ".38" : ".72"})`;
          textureContext.fillRect(random(seed + index) * 128, random(seed + index + 1) * 128, 1 + random(seed + index + 2) * 2, .5);
        }
      }
      if (pattern !== "satin") {
        textureContext.strokeStyle = "rgba(216,255,77,.28)";
        textureContext.lineWidth = 1.4;
        for (let position = -128; position < 256; position += 18) {
          textureContext.beginPath();
          textureContext.moveTo(position, 0);
          textureContext.lineTo(position + 128, 128);
          textureContext.stroke();
        }
      }
      const texture = new THREE.CanvasTexture(textureCanvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      metalTextures.push(texture);
      return texture;
    };
    const materialStyles = [
      [0x303b36, "grain", .3, .28], [0x53625b, "brushed", .26, .2],
      [0x8b9991, "perforated", .34, .2], [0x9eaaa2, "satin", .62, .32],
      [0x46544d, "grain", .42, .24], [0x718078, "brushed", .3, .18],
    ] as const;
    const darkMaterials = materialStyles.map(([color, pattern, roughness, clearcoat], index) => {
      const texture = createTexture(pattern, index * 41 + 7);
      return new THREE.MeshPhysicalMaterial({
        color, map: texture, bumpMap: texture, bumpScale: pattern === "perforated" ? .08 : .035,
        emissive: 0x173423, emissiveIntensity: .58, metalness: .94, roughness, clearcoat, clearcoatRoughness: .16,
      });
    });
    const tileMaterials: THREE.MeshPhysicalMaterial[] = [];
    const edgeGeometry = new THREE.EdgesGeometry(cubieGeometry);
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x9eaaa3, transparent: true, opacity: 0.8 });

    for (let x = -1; x <= 1; x += 1) {
      for (let y = -1; y <= 1; y += 1) {
        for (let z = -1; z <= 1; z += 1) {
          const materialIndex = (x * 5 + y * 3 + z * 7 + 30) % darkMaterials.length;
          const tileMaterial = darkMaterials[materialIndex].clone();
          tileMaterial.color.multiplyScalar(.78 + ((x + 2) * 3 + (y + 2) * 2 + z + 3) % 5 * .1);
          tileMaterials.push(tileMaterial);
          const cubie = new THREE.Mesh(cubieGeometry, tileMaterial);
          cubie.position.set(x * 0.94, y * 0.94, z * 0.94);
          cubie.add(new THREE.LineSegments(edgeGeometry, edgeMaterial));
          cube.add(cubie);
        }
      }
    }
    cube.rotation.set(-0.22, 0.62, 0.12);
    scene.add(cube);

    const particlePositions = new Float32Array(42 * 3);
    for (let index = 0; index < particlePositions.length; index += 3) {
      particlePositions[index] = (Math.random() - 0.5) * 5.5;
      particlePositions[index + 1] = (Math.random() - 0.5) * 5.5;
      particlePositions[index + 2] = (Math.random() - 0.5) * 3.5;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({ color: 0xd8ff4d, size: 0.025, transparent: true, opacity: 0.55, sizeAttenuation: true }));
    scene.add(particles);

    scene.add(new THREE.HemisphereLight(0xf2f1ea, 0x15211a, 2.2));
    const keyLight = new THREE.DirectionalLight(0xffffff, 5.8);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0xd8ff4d, 12, 8);
    rimLight.position.set(-3, -1, 2);
    scene.add(rimLight);

    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let velocityX = 0;
    let velocityY = 0;
    const handlePointerDown = (event: globalThis.PointerEvent) => {
      velocityX = 0;
      velocityY = 0;
      pointer.current = { active: true, x: event.clientX, y: event.clientY };
      canvas.setPointerCapture(event.pointerId);
    };
    const handlePointerMove = (event: globalThis.PointerEvent) => {
      if (!pointer.current.active) return;
      const deltaX = event.clientX - pointer.current.x;
      const deltaY = event.clientY - pointer.current.y;
      velocityY = -deltaX * 0.012;
      velocityX = deltaY * 0.012;
      cube.rotation.y += velocityY;
      cube.rotation.x += velocityX;
      pointer.current.x = event.clientX;
      pointer.current.y = event.clientY;
    };
    const handlePointerUp = (event: globalThis.PointerEvent) => {
      pointer.current.active = false;
      canvas.releasePointerCapture(event.pointerId);
    };
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerUp);

    let frame = 0;
    const animate = (time: number) => {
      if (!reducedMotion && !pointer.current.active) {
        if (Math.abs(velocityX) + Math.abs(velocityY) > 0.001) {
          cube.rotation.x += velocityX;
          cube.rotation.y += velocityY;
          velocityX *= 0.94;
          velocityY *= 0.94;
        } else {
          cube.rotation.y += 0.0011;
        }
      }
      rimLight.intensity = 10 + Math.sin(time * 0.002) * 3;
      particles.rotation.y = time * 0.00008;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerUp);
      cubieGeometry.dispose();
      edgeGeometry.dispose();
      darkMaterials.forEach((material) => material.dispose());
      tileMaterials.forEach((material) => material.dispose());
      edgeMaterial.dispose();
      metalTextures.forEach((texture) => texture.dispose());
      particleGeometry.dispose();
      (particles.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas className="metal-cube" ref={canvasRef} aria-label="Interactive 3 by 3 dark metallic Rubik's cube. Drag to rotate." role="img" />;
}
