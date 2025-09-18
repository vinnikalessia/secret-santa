import type { Santa, Mission } from '../interfaces/santaInterface.ts';

export function generateMissions(santas: Santa[]): Mission[] {
    if (santas.length < 3) return [];

    const shuffled = [...santas].sort(() => Math.random() - 0.5);

    return shuffled.map((giver, index) => ({
        giver,
        receiver: shuffled[(index + 1) % shuffled.length],
    }));
}
