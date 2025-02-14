<template>
  <div>
    <TresCanvas shadows :onCreated="on_created" clear-color="#82DBC5" window-size>
      <TresPerspectiveCamera :position="[0, 0, 5]" :look-at="[0, 0, 0]" />

      <TresMesh ref="cubeRef" :position="[0, 0, 0]" @pointer-enter="on_pointer_enter" @pointer-leave="on_pointer_leave">
        <TresSphereGeometry :args="[1, 32, 32]" />
        <TresMeshStandardMaterial :color="color" :emissive="emissive" />
      </TresMesh>

      <TresDirectionalLight :position="[3, 5, 2]" :castShadow="true" :intensity="1" />

      <TresAmbientLight :intensity="1" />
    </TresCanvas>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as THREE from "three";
import { TresCanvas } from "@tresjs/core";

const cubeRef = ref<THREE.Mesh>(null!);
const color = ref<string>("#00ff00");
const emissive = ref<string>("#000000");

const on_pointer_enter = () => {
  color.value = "#ff0000";
  emissive.value = "#000fff";
};

const on_pointer_leave = () => {
  color.value = "#00ff00";
  emissive.value = "#000000";
};

const on_created = ({ renderer }: { renderer: THREE.WebGLRenderer }) => {
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  if (cubeRef.value) {
    cubeRef.value.castShadow = true;
  }
};
</script>

<style scoped></style>
