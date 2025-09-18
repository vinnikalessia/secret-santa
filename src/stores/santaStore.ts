import { defineStore } from 'pinia';
// every santa has a mission: to give another a gift.
import type { Santa, Mission } from '../interfaces/santaInterface.ts';
import { generateMissions } from '../utils/santaUtils.ts';


export const useSantaStore = defineStore('santa', {
    state: () => ({
        santa: [] as Santa[],
        missions: [] as Mission[],
        nextId: 1,
    }),
    actions: {
        addSanta(name: string) {
            this.santa.push({ id: this.nextId++, name });
        },
        assignMissions() {
            // you have to be at least with 3 Santa's in total
            if (this.santa.length < 3) return;

            // generate missions and assign randomly
            this.missions = generateMissions(this.santa);
        },
        reset() {
            this.santa = [];
            this.missions = [];
            this.nextId = 1;
        },
    },
});
