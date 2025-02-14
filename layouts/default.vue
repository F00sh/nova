<template>
  <div class="relative w-screen h-screen overflow-hidden">
    <div class="absolute inset-0 -z-10">
      <Three />
    </div>

    <div class="absolute inset-0 pointer-events-none">
      <Navigation class="pointer-events-auto" />

      <div class="flex-1 pointer-events-auto">
        <slot />
      </div>

      <Footer class="pointer-events-auto" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
