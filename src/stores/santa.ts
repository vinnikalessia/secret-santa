import { defineStore } from 'pinia';
// every santa has a mission: to give another a gift.
import type { Santa, Mission } from '../interfaces/santaInterface.ts';


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
        generateMissions() {
            // you have to be at least with 4 Santa's in total
            if (this.santa.length < 4) return;
            const shuffled = [...this.santa].sort(() => Math.random() - 0.5);
            this.missions = shuffled.map((giver, index) => ({
                giver,
                receiver: shuffled[(index + 1) % shuffled.length],
            }));
        },
        reset() {
            this.santa = [];
            this.missions = [];
            this.nextId = 1;
        },
    },
});
