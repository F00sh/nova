<template>
  <div
    class="top-0 text-yellow-300 flex items-center justify-between w-screen h-max lg:w-[1200px] p-10 rounded-4xl">
    <div
      class="bg-linear-to-r from-white/10 to-green-400/40 w-full h-full flex items-center justify-between p-10 rounded-4xl shadow-xl">
      <h1 class="text-2xl">header</h1>
      <NuxtLink to="/blog"
        class="flex items-center justify-center w-10 h-10 bg-yellow-400 hover:bg-blue-400 rounded-full shadow-xl">
        <h1 class="text-center text-blue-600 text-2xl font-black">blog</h1>
      </NuxtLink>
     
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
