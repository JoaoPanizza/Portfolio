import * as THREE from 'three';

export function createDeveloperScene(host, reduced, theme, onContextLost) {
  const lightTheme = theme === 'light';
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.25 : 1.5),
  );
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = lightTheme ? 1.05 : 1.4;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
  camera.position.set(3.5, 2.7, 5.9);
  camera.lookAt(0, 0.25, 0);
  scene.add(new THREE.HemisphereLight(0xf4f0e8, 0x32363c, 3));
  const key = new THREE.DirectionalLight(0xf2f2e9, 4);
  key.position.set(-3, 6, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xa8b88b, 2);
  rim.position.set(4, 2, -3);
  scene.add(rim);

  const model = new THREE.Group();
  scene.add(model);
  const shell = new THREE.MeshStandardMaterial({
    color: lightTheme ? 0xbac2b4 : 0x41444a,
    metalness: 0.6,
    roughness: 0.36,
  });
  const dark = new THREE.MeshStandardMaterial({
    color: lightTheme ? 0x565f50 : 0x111316,
    metalness: 0.2,
    roughness: 0.6,
  });
  const keyMaterial = new THREE.MeshStandardMaterial({
    color: lightTheme ? 0xdce2d6 : 0x292c32,
    roughness: 0.6,
    metalness: 0.25,
  });
  function box(parent, width, height, depth, material, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }
  box(model, 3.3, 0.13, 2.05, shell, 0, -0.65, 0);
  box(model, 3.12, 0.025, 1.88, dark, 0, -0.57, 0);
  const keyGeometry = new THREE.BoxGeometry(0.2, 0.027, 0.16);
  for (let row = 0; row < 4; row++)
    for (let col = 0; col < 12; col++) {
      const mesh = new THREE.Mesh(keyGeometry, keyMaterial);
      mesh.position.set(-1.32 + col * 0.24, -0.54, -0.57 + row * 0.23);
      model.add(mesh);
    }
  box(model, 1.1, 0.027, 0.15, keyMaterial, 0, -0.54, 0.35);
  box(model, 0.92, 0.018, 0.38, shell, 0, -0.54, 0.72);
  const lid = new THREE.Group();
  lid.position.set(0, -0.58, -0.94);
  lid.rotation.x = -0.16;
  model.add(lid);
  box(lid, 3.3, 2.02, 0.1, shell, 0, 1, 0);
  box(lid, 3.14, 1.87, 0.018, dark, 0, 1, 0.059);
  const screenCanvas = document.createElement('canvas');
  screenCanvas.width = 1024;
  screenCanvas.height = 600;
  const ctx = screenCanvas.getContext('2d');
  ctx.fillStyle = lightTheme ? '#f5f6f4' : '#15171b';
  ctx.fillRect(0, 0, 1024, 600);
  ctx.fillStyle = lightTheme ? '#dfe6d8' : '#24272c';
  ctx.fillRect(0, 0, 1024, 65);
  ctx.font = '22px monospace';
  ctx.fillStyle = lightTheme ? '#26311f' : '#dcded7';
  ctx.fillText('</> developer.js', 35, 42);
  ctx.fillStyle = '#a8b88b';
  ctx.fillRect(0, 63, 280, 2);
  const lines = [
    '// João Panizza · tecnologia',
    '',
    'const developer = {',
    '  focus: "aprender e colaborar",',
    '  learning: ["React", "Tailwind CSS"],',
    '  mindset: "sempre aprendendo",',
    '  next: "novos horizontes"',
    '};',
    '',
    'build(developer);',
  ];
  ctx.font = '25px monospace';
  lines.forEach((line, i) => {
    ctx.fillStyle = '#667078';
    ctx.fillText(String(i + 1).padStart(2, '0'), 26, 115 + i * 42);
    ctx.fillStyle = lightTheme
      ? i === 0
        ? '#376b16'
        : '#26311f'
      : i === 0
        ? '#a8b88b'
        : '#e3e4dd';
    ctx.fillText(line, 85, 115 + i * 42);
  });
  const texture = new THREE.CanvasTexture(screenCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(2.98, 1.71),
    new THREE.MeshBasicMaterial({ map: texture }),
  );
  screen.position.set(0, 1, 0.073);
  lid.add(screen);
  const led = new THREE.Mesh(
    new THREE.SphereGeometry(0.014, 8, 6),
    new THREE.MeshBasicMaterial({ color: 0xa8b88b }),
  );
  led.position.set(0, 1.95, 0.065);
  lid.add(led);

  let frame = 0,
    disposed = false,
    inView = true;
  let pointerX = 0,
    pointerY = 0;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  function draw() {
    frame = 0;
    if (disposed || !inView || document.hidden) return;
    const targetY = 0.12 + pointerX * 0.85;
    const targetX = pointerY * 0.32;
    model.rotation.y = reduced
      ? targetY
      : model.rotation.y + (targetY - model.rotation.y) * 0.09;
    model.rotation.x = reduced
      ? targetX
      : model.rotation.x + (targetX - model.rotation.x) * 0.09;
    renderer.render(scene, camera);
    if (
      !reduced &&
      Math.abs(targetY - model.rotation.y) + Math.abs(targetX - model.rotation.x) > 0.0005
    )
      requestDraw();
  }
  function requestDraw() {
    if (!frame && !disposed && inView && !document.hidden)
      frame = requestAnimationFrame(draw);
  }
  const resize = new ResizeObserver(() => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    requestDraw();
  });
  resize.observe(host);
  const observer = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (inView) requestDraw();
    else {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  });
  observer.observe(host);
  const move = (event) => {
    if (reduced || !finePointer.matches) return;
    const rect = host.getBoundingClientRect();
    pointerX = (event.clientX - rect.left) / rect.width - 0.5;
    pointerY = (event.clientY - rect.top) / rect.height - 0.5;
    requestDraw();
  };
  const leave = () => {
    pointerX = 0;
    pointerY = 0;
    requestDraw();
  };
  const lost = (event) => {
    event.preventDefault();
    cancelAnimationFrame(frame);
    frame = 0;
    onContextLost();
  };
  const onVisibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else requestDraw();
  };
  host.addEventListener('pointermove', move, { passive: true });
  host.addEventListener('pointerleave', leave);
  renderer.domElement.addEventListener('webglcontextlost', lost);
  document.addEventListener('visibilitychange', onVisibility);
  requestDraw();
  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    resize.disconnect();
    observer.disconnect();
    host.removeEventListener('pointermove', move);
    host.removeEventListener('pointerleave', leave);
    document.removeEventListener('visibilitychange', onVisibility);
    renderer.domElement.removeEventListener('webglcontextlost', lost);
    const geometries = new Set(),
      materials = new Set();
    scene.traverse((object) => {
      if (object.geometry) geometries.add(object.geometry);
      if (object.material) materials.add(object.material);
    });
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
    texture.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
