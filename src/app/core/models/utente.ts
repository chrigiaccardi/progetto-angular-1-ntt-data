export interface Utente {
    id: string;
    name: string;
    email: string;
    gender: 'male' | 'female';
    status: 'active' | 'inactive';
}