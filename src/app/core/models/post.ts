export interface Post {
    id: string;
    user_id: string;
    title: string;
    body: string;
}

export type AggiungiPost = {
    user_id: string;
    nuovoPost: Omit<Post, 'id'>
}
