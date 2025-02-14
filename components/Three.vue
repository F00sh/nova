<template>
  <div>
    <canvas ref="three" />
  </div>
</template>

<script lang="ts" setup>
  import { Mesh, MeshBasicMaterial, Scene, SphereGeometry, WebGLRenderer } from 'three';
  import { PerspectiveCamera } from 'three';
  import { ref, onMounted, type Ref } from 'vue';

  const three: Ref<HTMLCanvasElement | null> = ref(null)
  const scene = new Scene();
  let renderer: WebGLRenderer;

  const width = 800;
  const height = 600;

  const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(0, 0, 5)

  scene.add(camera)

  const sphere = new Mesh(
    new SphereGeometry(1, 32, 32),
    new MeshBasicMaterial({ color: 0x008080 }));
    scene.add(sphere)

    onMounted(() => {
      if (three.value) {
        renderer = new WebGLRenderer({ canvas: three.value });
        renderer.setSize(width, height);
        renderer.render(scene, camera);
      }

        renderer.setSize(width, height);
        renderer.render(scene, camera);
      });
    
    

</script>

<style>

</style>