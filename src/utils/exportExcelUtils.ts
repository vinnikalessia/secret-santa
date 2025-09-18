import * as XLSX from 'xlsx'
import type { Santa, Mission } from '../interfaces/santaInterface'
import { generateMissions } from './santaUtils'

export function exportMissionsToExcel(santas: Santa[], missions: Mission[]) {
    if (!santas.length) return

    let effectiveMissions = missions
    if (santas.length >= 3 && effectiveMissions.length === 0) {
        // generate on the fly (does not persist to store—pure export concern)
        effectiveMissions = generateMissions(santas)
    }

    const rows = (
        effectiveMissions.length
        ? effectiveMissions.map((m) => ({
            Giver: m.giver.name,
            Recipient: m.receiver.name,
            }))
        : santas.map((s) => ({ Giver: s.name, Recipient: '' }))
    ).sort((a, b) => a.Giver.localeCompare(b.Giver, undefined, { sensitivity: 'base' }))

    const ws = XLSX.utils.json_to_sheet(rows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Secret Santa')
    XLSX.writeFile(wb, 'secret-santa.xlsx')
}
