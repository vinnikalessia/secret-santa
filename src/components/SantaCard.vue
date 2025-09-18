<script setup lang="ts">
import { computed } from 'vue'

// import icon
import { PhGift } from '@phosphor-icons/vue'

interface Props {
    id: number
    name: string
    revealedName?: string | null
    disabled?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'reveal', id: number): void }>()

const isRevealed = computed(() => !!props.revealedName)

function onReveal() {
    if (props.disabled) return
    emit('reveal', props.id)
    }
</script>

<template>
    <li class="group relative overflow-hidden rounded-xl border border-slate-200/70 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all p-4 flex items-center gap-3">
        <div class="flex flex-col flex-1 min-w-0">
            <span class="font-medium text-slate-800 truncate">{{ name }}</span>
            <transition name="fade-slide">
                <div v-if="isRevealed" class="mt-1 text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded px-2 py-1" >
                    <p class="flex items-center gap-1">
                        Gift goes to
                        <span class="font-bold text-indigo-600">{{ revealedName }}</span>
                    </p>
                </div>
            </transition>
        </div>
        <button type="button" class="relative inline-flex items-center justify-center h-8 w-8 rounded-full border border-indigo-300 bg-gradient-to-br from-indigo-500/90 to-sky-500 text-white text-sm font-semibold shadow-sm hover:from-indigo-500 hover:to-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70 disabled:opacity-40 disabled:cursor-not-allowed" :disabled="disabled" @click="onReveal" :title="disabled ? 'Need at least 3 participants' : 'Reveal receiver'" >
            <span v-if="!isRevealed" class="inline-flex items-center">
                ? <PhGift :size="16" class="text-white" />
            </span>
            <span v-else class="animate-pulse">👀</span>
        </button>
        <span class="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 bg-gradient-to-br from-indigo-500/5 via-sky-500/5 to-blue-500/10 transition-opacity" />
    </li>
</template>

<style scoped>
    .fade-slide-enter-active,
    .fade-slide-leave-active {
        transition: all 0.18s ease;
    }

    .fade-slide-enter-from,
    .fade-slide-leave-to {
        opacity: 0;
        transform: translateY(-4px);
    }

    .fade-slide-enter-to,
    .fade-slide-leave-from {
        opacity: 1;
        transform: translateY(0);
    }
</style>
