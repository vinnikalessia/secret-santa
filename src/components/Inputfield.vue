<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSantaStore } from '../stores/santaStore'

const nameInput = ref('')
const touched = ref(false)
const store = useSantaStore()
const maxLength = 30

const trimmed = computed(() => nameInput.value.trim())

const alreadyExists = computed(() =>
  store.santa.some((s) => s.name.toLowerCase() === trimmed.value.toLowerCase()),
)

const error = computed(() => {
  if (!touched.value && trimmed.value.length === 0) return ''
  if (trimmed.value.length === 0) return 'Please enter a unique name'
  if (trimmed.value.length > maxLength) return `Name can be max ${maxLength} characters`
  if (alreadyExists.value) return 'This name is already added'
  return ''
})

const canAdd = computed(() => error.value === '' && trimmed.value.length > 0)

function add() {
  touched.value = true
  if (!canAdd.value) return
  store.addSanta(trimmed.value)
  // light success pulse effect by toggling a class
  successPulse()
  nameInput.value = ''
  touched.value = false
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    add()
  }
}

const pulse = ref(false)
function successPulse() {
  pulse.value = true
  setTimeout(() => (pulse.value = false), 450)
}
</script>

<template>
  <div class="w-full max-w-xl mx-auto mb-8">
    <label for="santaName" class="block text-sm font-medium text-indigo-700 mb-1">
      Add participant
    </label>
    <div class="relative group">
      <input
        id="santaName"
        v-model="nameInput"
        @input="touched = true"
        @keydown="onKey"
        type="text"
        :maxlength="maxLength + 5"
        placeholder="Type a name and press Enter…"
        class="peer w-full rounded-xl border bg-white/70 backdrop-blur-sm border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-300/40 transition-all px-4 py-3 pr-32 shadow-sm outline-none text-slate-800 placeholder:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
        :aria-invalid="!!error"
        :aria-describedby="error ? 'name-error' : undefined"
      />
      <div class="absolute inset-y-0 right-0 flex items-center gap-2 pr-2">
        <button
          type="button"
          @click="add"
          :disabled="!canAdd"
          class="relative inline-flex items-center gap-1 rounded-lg h-9 px-4 text-sm font-medium transition-all disabled:cursor-not-allowed disabled:opacity-40 text-white bg-gradient-to-br from-indigo-500 via-sky-500 to-blue-600 hover:from-indigo-500 hover:via-sky-500 hover:to-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70 shadow-md active:scale-[.97] overflow-hidden"
        >
          <span class="z-10">Add</span>
          <span v-if="pulse" class="absolute inset-0 animate-ping rounded-lg bg-white/40" />
        </button>
      </div>
      <div
        class="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-indigo-500/0 group-focus-within:via-indigo-500/10 group-focus-within:to-sky-500/10 transition-colors"
      />
    </div>
    <div class="flex justify-between mt-1 text-[11px] text-neutral-400 select-none">
      <span>{{ trimmed.length }}/{{ maxLength }}</span>
      <span v-if="store.santa.length" class="italic">{{ store.santa.length }} added</span>
    </div>
    <p
      v-if="error"
      :id="'name-error'"
      class="mt-2 text-sm text-rose-600 flex items-center gap-1"
      aria-live="polite"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-4 h-4"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5zM10 13.5a1 1 0 100 2 1 1 0 000-2z"
          clip-rule="evenodd"
        />
      </svg>
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
/* extra subtle animation for the add button on enable */
button:not(:disabled) {
  animation: fadeIn 0.25s ease;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
