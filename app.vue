<template>
  <div class="relative w-screen h-screen overflow-hidden">
    <div class="absolute inset-0 z-10 pointer-events-none">
      <NuxtRouteAnnouncer />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
