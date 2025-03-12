<template>
  <div>
    <TresCanvas shadows :onCreated="onCreated" clear-color="#82DBC5" window-size>
      <TresPerspectiveCamera :position="[15, 10, 5]" :look-at="[0, 0, 0]" />
      <Suspense>
        <primitive v-if="scene" :object="scene" />
      </Suspense>
      <TresDirectionalLight :position="[3, 5, 2]" :castShadow="true" :intensity="1" />
      <TresAmbientLight :intensity="1" />
    </TresCanvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, markRaw } from "vue";
import * as THREE from "three";
import { useGLTF } from "@tresjs/cientos";

const scene = ref(null);
let cube = null;

onMounted(async () => {
  const gltf = await useGLTF("/model/cube.glb");
  scene.value = markRaw(gltf.scene);

  console.log("Loaded Scene:", scene.value);

  cube = scene.value.getObjectByName("Cube");
  if (cube) {
    console.log("Found Cube Mesh:", cube);

    cube.material = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      roughness: 0.5,
      metalness: 0.1,
    });

    cube.castShadow = true;
    cube.receiveShadow = true;

    animate();
  }
});

const animate = () => {
  if (cube) {
    cube.rotation.y += 0.01;
  }
  requestAnimationFrame(animate);
};

const onCreated = ({ renderer }) => {
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
};
</script>
