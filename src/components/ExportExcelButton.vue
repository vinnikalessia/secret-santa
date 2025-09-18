<script setup lang="ts">
import { useSantaStore } from '../stores/santaStore'
import { exportMissionsToExcel } from '../utils/exportExcelUtils'

const store = useSantaStore()

function handleExport() {
    // Ensure missions exist if enough participants
    if (store.santa.length >= 3 && store.missions.length === 0) {
        store.assignMissions()
    }
    exportMissionsToExcel(store.santa, store.missions)
}
</script>

<template>
    <button
        type="button"
        class="ml-auto px-3 py-1.5 rounded-md text-sm font-medium bg-gradient-to-br from-indigo-500 via-sky-500 to-blue-600 hover:from-indigo-500 hover:via-sky-500 hover:to-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70 shadow-md active:scale-[.97] overflow-hidden text-white disabled:opacity-40 transition"
        :disabled="store.santa.length < 3"
        @click="handleExport"
        title="Download Excel file"
    >
        Export Excel
    </button>
</template>
