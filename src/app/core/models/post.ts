export interface Post {
    id: number;
    userId: string;
    title: string;
    body: string;
}

export type AggiungiPost = {
    userId: string;
    nuovoPost: Omit<Post, 'id'>
}
