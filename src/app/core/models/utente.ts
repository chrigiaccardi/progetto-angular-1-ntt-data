export interface Utente {
    id: number;
    name: string;
    email: string;
    gender: 'male' | 'female';
    status: 'active' | 'inactive';
}