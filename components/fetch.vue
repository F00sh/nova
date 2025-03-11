<template>
  <div class="p-4 max-w-sm mx-auto bg-white rounded-lg shadow-md">
    <button
      @click="fetchPokemon"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Dohvati Pokémona
    </button>

    <div v-if="pokemon" class="mt-4">
      <h2 class="text-xl font-bold capitalize">{{ pokemon.name }}</h2>
      <img
        :src="pokemon.sprites.front_default"
        :alt="pokemon.name"
        class="mt-2"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const pokemon = ref(null);

async function fetchPokemon() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/mr-mime');
  if (!res.ok) {
    console.error('Greška pri dohvaćanju Pokémona');
    return;
  }
  pokemon.value = await res.json();
}
</script>
