export interface Santa {
    id: number;
    name: string;
}

export interface Mission {
    giver: Santa;
    receiver: Santa;
}