<script setup lang="ts">
import Inputfield from './components/Inputfield.vue'
import SantaList from './components/SantaList.vue'
</script>

<template>
  <div class="min-h-screen bg-indigo-50">
    <header class="text-center p-6">
      <h1 class="text-3xl font-extrabold text-indigo-900">Secret Santa picker 🎅</h1>
    </header>
    <main class="flex flex-col gap-6 p-8">
      <Inputfield />
      <SantaList />
    </main>
  </div>
</template>
