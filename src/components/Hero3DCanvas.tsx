import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 580;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xf5eedc, 1.8);
    dirLight.position.set(5, 8, 7);
    scene.add(dirLight);

    const subtleBlueLight = new THREE.DirectionalLight(0x6070a0, 0.85);
    subtleBlueLight.position.set(-6, -4, 4);
    scene.add(subtleBlueLight);

    // Group holding all design system elements
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Helper function to draw rounded rect safely
    function drawRRect(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
      context.beginPath();
      context.moveTo(x + r, y);
      context.lineTo(x + w - r, y);
      context.quadraticCurveTo(x + w, y, x + w, y + r);
      context.lineTo(x + w, y + h - r);
      context.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      context.lineTo(x + r, y + h);
      context.quadraticCurveTo(x, y + h, x, y + h - r);
      context.lineTo(x, y + r);
      context.quadraticCurveTo(x, y, x + r, y);
      context.closePath();
    }

    // Helper function to create canvas textures for UI cards
    function createUICardTexture(title: string, subtitle: string, type: 'dashboard' | 'wireframe' | 'metric') {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 320;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(canvas);

      // Background
      ctx.fillStyle = '#16161c';
      drawRRect(ctx, 0, 0, 512, 320, 16);
      ctx.fill();

      // Subtle border
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#2d2d38';
      ctx.stroke();

      // Browser / Window Top bar
      ctx.fillStyle = '#1f1f27';
      drawRRect(ctx, 0, 0, 512, 48, 16);
      ctx.fill();

      // Window dots
      ctx.fillStyle = '#ff5f56';
      ctx.beginPath();
      ctx.arc(28, 24, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffbd2e';
      ctx.beginPath();
      ctx.arc(46, 24, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#27c93f';
      ctx.beginPath();
      ctx.arc(64, 24, 5, 0, Math.PI * 2);
      ctx.fill();

      // Title in header
      ctx.fillStyle = '#8e8d99';
      ctx.font = '500 13px -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", sans-serif';
      ctx.fillText(title, 90, 28);

      if (type === 'dashboard') {
        ctx.fillStyle = '#e2c974';
        ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", sans-serif';
        ctx.fillText('DESIGN SYSTEM', 36, 110);

        ctx.fillStyle = '#787785';
        ctx.font = '13px -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", sans-serif';
        ctx.fillText('Token Hierarchy · Fluid UI', 36, 134);

        const barHeights = [40, 65, 80, 50, 95, 115, 85, 130];
        barHeights.forEach((h, i) => {
          ctx.fillStyle = i === 5 ? '#e2c974' : '#272733';
          drawRRect(ctx, 36 + i * 54, 280 - h, 36, h, 6);
          ctx.fill();
        });
      } else if (type === 'wireframe') {
        ctx.fillStyle = '#20202a';
        drawRRect(ctx, 36, 75, 180, 24, 4);
        ctx.fill();

        ctx.fillStyle = '#1c1c24';
        drawRRect(ctx, 36, 115, 440, 65, 8);
        ctx.fill();

        ctx.fillStyle = '#e2c974';
        drawRRect(ctx, 36, 195, 130, 36, 6);
        ctx.fill();

        ctx.fillStyle = '#16161c';
        ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", sans-serif';
        ctx.fillText('EXPLORE SYSTEM', 50, 218);
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", sans-serif';
        ctx.fillText(title, 36, 100);

        ctx.fillStyle = '#9e9da8';
        ctx.font = '14px -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", sans-serif';
        ctx.fillText(subtitle, 36, 130);

        ctx.fillStyle = 'rgba(226, 201, 116, 0.15)';
        drawRRect(ctx, 36, 180, 175, 32, 16);
        ctx.fill();
        ctx.strokeStyle = '#e2c974';
        ctx.stroke();

        ctx.fillStyle = '#e2c974';
        ctx.font = '500 12px -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", sans-serif';
        ctx.fillText('Precision & Craft', 50, 201);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      return texture;
    }

    const texturesToDispose: THREE.CanvasTexture[] = [];

    // 1. Primary Hero Browser Window Mockup
    const geom1 = new THREE.BoxGeometry(3.6, 2.25, 0.08);
    const tex1 = createUICardTexture('ClientFlow · Workspace Overview', '', 'dashboard');
    texturesToDispose.push(tex1);
    const mat1 = new THREE.MeshPhongMaterial({
      map: tex1,
      shininess: 40,
      specular: 0x333333,
    });
    const mesh1 = new THREE.Mesh(geom1, mat1);
    mesh1.position.set(0.2, 0.2, 0.6);
    mesh1.rotation.set(0.12, -0.32, 0.05);
    mainGroup.add(mesh1);

    // 2. Layered Secondary Wireframe Card
    const geom2 = new THREE.BoxGeometry(2.8, 1.8, 0.06);
    const tex2 = createUICardTexture('Design System Token Architecture', '', 'wireframe');
    texturesToDispose.push(tex2);
    const mat2 = new THREE.MeshPhongMaterial({
      map: tex2,
      shininess: 30,
      specular: 0x222222,
    });
    const mesh2 = new THREE.Mesh(geom2, mat2);
    mesh2.position.set(-1.2, -0.7, 1.2);
    mesh2.rotation.set(0.08, -0.22, 0.08);
    mainGroup.add(mesh2);

    // 3. Floating Accent Metric Card
    const geom3 = new THREE.BoxGeometry(2.2, 1.4, 0.05);
    const tex3 = createUICardTexture('System Quality Index', 'Optimized for Conversion & Feel', 'metric');
    texturesToDispose.push(tex3);
    const mat3 = new THREE.MeshPhongMaterial({
      map: tex3,
      shininess: 50,
      specular: 0x444444,
    });
    const mesh3 = new THREE.Mesh(geom3, mat3);
    mesh3.position.set(1.4, 1.1, 1.4);
    mesh3.rotation.set(0.18, -0.4, -0.04);
    mainGroup.add(mesh3);

    // 4. Subtle Geometric Elements (Golden Ratio Ring)
    const torusGeom = new THREE.TorusGeometry(1.6, 0.02, 16, 100);
    const torusMat = new THREE.MeshPhongMaterial({
      color: 0xe2c974,
      shininess: 90,
      specular: 0xffffff,
      transparent: true,
      opacity: 0.65,
    });
    const torus = new THREE.Mesh(torusGeom, torusMat);
    torus.rotation.x = Math.PI / 2.8;
    torus.position.set(0.2, 0, 0);
    mainGroup.add(torus);

    // Small floating design token spheres
    const spheres: Array<{ mesh: THREE.Mesh; baseAngle: number; speed: number }> = [];
    const sphereGeom = new THREE.SphereGeometry(0.08, 32, 32);
    const sphereMat = new THREE.MeshPhongMaterial({ color: 0xe2c974, shininess: 80, specular: 0xffeedd });
    for (let i = 0; i < 7; i++) {
      const s = new THREE.Mesh(sphereGeom, sphereMat);
      const angle = (i / 7) * Math.PI * 2;
      const radius = 2.4 + (i % 2) * 0.4;
      s.position.set(Math.cos(angle) * radius, Math.sin(angle) * 1.5 - 0.2, Math.sin(angle * 2) * 0.8);
      mainGroup.add(s);
      spheres.push({ mesh: s, baseAngle: angle, speed: 0.005 + i * 0.002 });
    }

    // Subtle grid plane in background
    const gridHelper = new THREE.GridHelper(8, 16, 0x3d3c4a, 0x1f1f29);
    gridHelper.rotation.x = Math.PI / 2.4;
    gridHelper.position.set(0, -0.6, -1.2);
    mainGroup.add(gridHelper);

    // Mouse & Touch Parallax Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = Math.max(-1, Math.min(1, normX)) * 0.45;
      targetY = Math.max(-1, Math.min(1, normY)) * 0.35;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        const normX = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((e.touches[0].clientY - rect.top) / rect.height) * 2 - 1);
        targetX = Math.max(-1, Math.min(1, normX)) * 0.4;
        targetY = Math.max(-1, Math.min(1, normY)) * 0.3;
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse damping
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      mainGroup.rotation.y = -0.15 + mouseX;
      mainGroup.rotation.x = 0.08 - mouseY;
      mainGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.12;

      // Card counter-movements
      mesh1.position.y = 0.2 + Math.sin(elapsedTime * 0.9) * 0.08;
      mesh2.position.y = -0.7 + Math.cos(elapsedTime * 0.7) * 0.07;
      mesh3.position.y = 1.1 + Math.sin(elapsedTime * 1.1 + 1) * 0.09;

      // Orbiting spheres
      spheres.forEach((item, idx) => {
        item.baseAngle += item.speed * 0.5;
        item.mesh.position.x = Math.cos(item.baseAngle) * 2.5;
        item.mesh.position.y = Math.sin(item.baseAngle) * 1.4 + Math.sin(elapsedTime + idx) * 0.1;
      });

      torus.rotation.z = elapsedTime * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      resizeObserver.disconnect();

      texturesToDispose.forEach((t) => t.dispose());
      geom1.dispose();
      mat1.dispose();
      geom2.dispose();
      mat2.dispose();
      geom3.dispose();
      mat3.dispose();
      torusGeom.dispose();
      torusMat.dispose();
      sphereGeom.dispose();
      sphereMat.dispose();
      gridHelper.dispose();

      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="three-hero-container"
      className="relative w-full h-full rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing border border-brand-border/40 bg-brand-surface/30 backdrop-blur-[2px]"
    >
      <div className="absolute bottom-4 left-6 pointer-events-none flex items-center gap-2 text-[11px] tracking-wider uppercase text-brand-textSubtle bg-brand-surface/90 px-3 py-1.5 rounded-full border border-brand-border/60 z-20">
        <svg
          className="w-3.5 h-3.5 text-brand-accent animate-spin"
          fill="none"
          stroke="currentColor"
          style={{ animationDuration: '8s' }}
          viewBox="0 0 24 24"
        >
          <path
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
        <span>Interactive 3D UI Mesh · Hover to Parallax</span>
      </div>
    </div>
  );
};
