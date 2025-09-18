<script setup lang="ts">
import { ref } from 'vue'
import { useSantaStore } from '../stores/santaStore'

// Import Phosphor icon component
import { PhGift } from '@phosphor-icons/vue'

// use Santa store
const store = useSantaStore()

// Map of giverId -> temporary revealed receiver name
const revealed = ref<Record<number, string>>({})
const revealing = ref<Record<number, boolean>>({})

function ensureMissions() {
    if (store.missions.length === 0) {
        store.generateMissions()
    }
}

function reveal(personId: number) {
    // Check if there are enough participants
    if (store.santa.length < 3) return
    ensureMissions()
    const mission = store.missions.find((m) => m.giver.id === personId)

    if (!mission) return
    if (revealing.value[personId]) return // debounce if already showing

    revealed.value[personId] = mission.receiver.name
    revealing.value[personId] = true

    setTimeout(() => {
        delete revealed.value[personId]
        revealing.value[personId] = false
    }, 3000)
}
</script>

<template>
    <section v-if="store.santa.length" class="space-y-4">
        <div class="flex items-center gap-3">
            <h2 class="text-xl font-semibold bg-gradient-to-r from-indigo-700 to-sky-500 bg-clip-text text-transparent" >All participants</h2>
            <span v-if="store.santa.length < 3" class="text-xs text-slate-500 italic">Add {{ 3 - store.santa.length }} more to enable mission reveal</span>
        </div>
        <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <li v-for="person in store.santa" :key="person.id" class="group relative overflow-hidden rounded-xl border border-slate-200/70 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all p-4 flex items-center gap-3" >
                <div class="flex flex-col flex-1 min-w-0">
                    <span class="font-medium text-slate-800 truncate">{{ person.name }}</span>
                    <transition name="fade-slide">
                        <div v-if="revealed[person.id]" class="mt-1 text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded px-2 py-1" >
                            <p class="flex items-center gap-1">
                                Your mission: give
                                <span class="font-bold text-indigo-600">{{ revealed[person.id] }}</span> a present.
                            </p>
                        </div>
                    </transition>
                </div>
                <button type="button" class="relative inline-flex items-center justify-center h-8 w-8 rounded-full border border-indigo-300 bg-gradient-to-br from-indigo-500/90 to-sky-500 text-white text-sm font-semibold shadow-sm hover:from-indigo-500 hover:to-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70 disabled:opacity-40 disabled:cursor-not-allowed" :disabled="store.santa.length < 3" @click="reveal(person.id)" :title="store.santa.length < 3 ? 'Need at least 3 participants' : 'Reveal receiver'" >
                    <span v-if="!revealed[person.id]" class="inline-flex items-center">
                        ? <PhGift :size="16" class="text-white" />
                    </span>
                    <span v-else class="animate-pulse">👀</span>

                </button>
                <span
                class="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 bg-gradient-to-br from-indigo-500/5 via-sky-500/5 to-blue-500/10 transition-opacity"
                />
            </li>
        </ul>
    </section>
    <p v-else class="text-neutral-400 italic text-sm">No participants yet. Add some names above.</p>
</template>
