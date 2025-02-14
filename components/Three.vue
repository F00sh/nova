<template>
  <div>
    <canvas ref="canvas" class="block"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue';
import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

// Reference to the canvas element
const canvas: Ref<HTMLCanvasElement | null> = ref(null);
let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;
const scene = new THREE.Scene();

// We'll store the sphere and its material in variables accessible to event handlers.
let sphere: THREE.Mesh;
let sphereMaterial: THREE.MeshStandardMaterial;

// Variables for animation and hover detection
let animationId: number;
let hovered = false;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event: MouseEvent) {
  // Get canvas position and size
  const rect = canvas.value!.getBoundingClientRect();
  // Convert mouse coordinates to normalized device coordinates (-1 to +1)
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  // Update the raycaster with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);
  // Check for intersections between the ray and the sphere
  const intersects = raycaster.intersectObject(sphere);
  hovered = intersects.length > 0;
}

onMounted(() => {
  if (!canvas.value) return;
  
  // Set initial dimensions based on the window
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  // Initialize the camera
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(0, 0, 5);
  scene.add(camera);
  
  // Create the renderer using the canvas reference
  renderer = new THREE.WebGLRenderer({ canvas: canvas.value, alpha: true });
  renderer.setSize(width, height);
  
  // Create a sphere with a material that supports lighting.
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
  sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x008080,
    emissive: new THREE.Color(0x008080),
    emissiveIntensity: 0 // Start with no emission
  });
  sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  scene.add(sphere);
  
  // --- Add a RectAreaLight ---
  RectAreaLightUniformsLib.init();
  const rectLight = new THREE.RectAreaLight(0xffffff, 5, 4, 2);
  rectLight.position.set(3, 3, 2);
  rectLight.lookAt(sphere.position);
  scene.add(rectLight);
  
  const rectLightHelper = new RectAreaLightHelper(rectLight);
  rectLight.add(rectLightHelper);
  
  // Animation loop: updates the sphere's emissive intensity if hovered.
  const clock = new THREE.Clock();
  function animate() {
    animationId = requestAnimationFrame(animate);
    
    if (hovered) {
      // Create a pulsating effect using a sine wave based on elapsed time.
      const time = clock.getElapsedTime();
      sphereMaterial.emissiveIntensity = 0.5 + 0.5 * Math.sin(time * 4);
    } else {
      sphereMaterial.emissiveIntensity = 0;
    }
    
    renderer.render(scene, camera);
  }
  animate();
  
  // Listen for mouse movement on the canvas
  canvas.value.addEventListener('mousemove', onMouseMove);
  // Reset hover state if the mouse leaves the canvas
  canvas.value.addEventListener('mouseleave', () => {
    hovered = false;
  });
  
  // Handle window resize events to update canvas size and camera aspect ratio
  const onWindowResize = () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    renderer.setSize(newWidth, newHeight);
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
  };
  window.addEventListener('resize', onWindowResize);
  
  onBeforeUnmount(() => {
    window.removeEventListener('resize', onWindowResize);
    canvas.value?.removeEventListener('mousemove', onMouseMove);
    cancelAnimationFrame(animationId);
  });
});
</script>

<style>
canvas {
  display: block;
}
</style>
