<script setup lang="ts">
import { ref } from 'vue'
import { useSantaStore } from '../stores/santaStore'
import SantaCard from './SantaCard.vue'

const store = useSantaStore()

// Map of giverId -> temporary revealed receiver name
const revealed = ref<Record<number, string>>({})
const revealing = ref<Record<number, boolean>>({})

function ensureMissions() {
    if (store.missions.length === 0) {
        store.generateMissions()
    }
}

function handleReveal(id: number) {
    if (store.santa.length < 3) return
    ensureMissions()
    const mission = store.missions.find((m) => m.giver.id === id)
    if (!mission) return
    if (revealing.value[id]) return
    revealed.value[id] = mission.receiver.name
    revealing.value[id] = true
    setTimeout(() => {
        delete revealed.value[id]
        revealing.value[id] = false
    }, 3000)
}
</script>

<template>
    <section v-if="store.santa.length" class="space-y-4">
        <div class="flex items-center gap-3">
        <h2
            class="text-xl font-semibold bg-gradient-to-r from-indigo-700 to-sky-500 bg-clip-text text-transparent"
        >
            All participants
        </h2>
        <span v-if="store.santa.length < 3" class="text-xs text-slate-500 italic"
            >Add {{ 3 - store.santa.length }} more to enable mission reveal</span
        >
        </div>
        <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <SantaCard
            v-for="person in store.santa"
            :key="person.id"
            :id="person.id"
            :name="person.name"
            :revealed-name="revealed[person.id]"
            :disabled="store.santa.length < 3"
            @reveal="handleReveal"
        />
        </ul>
    </section>
    <p v-else class="text-neutral-400 italic text-sm">No participants yet. Add some names above.</p>
</template>
