import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from "@ngrx/signals"
import { AggiungiPost, Post } from "../models/post"
import { HttpClient, HttpHeaders, httpResource } from "@angular/common/http"
import { computed, inject } from "@angular/core"
import { AuthService } from "../services/auth-service/auth-service"
import { Toaster } from "../services/toaster/toaster"

export type PostState = {
    postSelezionato: Post | null;
    paginaCorrente: number;
    itemXPagina: number;
    opzioniItemPagina: number[];
    filtroRicerca: string;
    erroreAggiungiPost: string;
}



export const PostsStore = signalStore(
    { providedIn: 'root' },

    withState({
        postSelezionato: null,
        paginaCorrente: 1,
        itemXPagina: 6,
        opzioniItemPagina: [6, 12, 18, 24],
        filtroRicerca: '',
        erroreAggiungiPost: '',
    } as PostState),
    
    withMethods((store, authService = inject(AuthService), http = inject(HttpClient), toaster = inject(Toaster)) => {

        // Istanziamo headersAutenticazione da riutilizzare
        const headersAutenticazione = new HttpHeaders({
            'Authorization': `Bearer ${authService.tokenLocalStorage()}`
        })

        // Effettuiamo la chiamata al backend per avere indietro l'array di post
        // i params sono per la pagina corrente, per gli item post da visualizzare e per la barra di ricerca
        const rispostaPost = httpResource<Post[]>(() => ({
            url: authService.urlPost,
            method: 'GET',
            params: {
                page: store.paginaCorrente(),
                per_page: store.itemXPagina(),
                name: store.filtroRicerca(),
            },
            headers: headersAutenticazione,
        }));


        // In simultanea facciamo la chiamata al backend per avere il nome e id dell'utente
        // Verrà utilizzato per accedere al nominativo dell'utente in base all'user id del post
        const rispostaIdNomeUtenti = httpResource<{ id: string, name: string }[]>(() => ({
            url: authService.urlUtenti,
            method: 'GET',
            params: {
                fields: 'id, name'
            },
            headers: headersAutenticazione,
        }))

        const rispostaPostDettagliUtente = httpResource<Post[]>(() => ({
            url: `${authService.apiUrl}/${store.idUtenteSelezionato()}/posts`,
            method: 'GET',
            headers: headersAutenticazione,
        }))

        return {
            posts: rispostaPost.value,
            caricamento: rispostaPost.isLoading,
            errore: rispostaPost.error,

            idNomeUtenti: rispostaIdNomeUtenti.value,
            caricamentoIdNomeUtenti: rispostaIdNomeUtenti.isLoading,
            erroreIdNomeUtenti: rispostaIdNomeUtenti.error,

            postsDettagliUtente: rispostaPostDettagliUtente.value,
            caricamentoPostsDettagliUtente: rispostaPostDettagliUtente.isLoading,
            errorePostsDettagliUtente: rispostaPostDettagliUtente.error,


            caricarePost: () => {
                rispostaPost.reload();
                rispostaIdNomeUtenti.reload();
            },

            andareAPagina: signalMethod((numeroPagina: number) => {
                patchState(store, { paginaCorrente: numeroPagina })
            }),

            itemPerPagina: signalMethod<number>((nItem: number) => {
                patchState(store, { itemXPagina: nItem })
            }),

            setFiltroRicerca: signalMethod<string>((testo: string) => {
                patchState(store, {
                    filtroRicerca: testo,
                    paginaCorrente: 1,
                })
            }),

            getNomeUtente: (user_id: string): string => {
                const nomeUtente = rispostaIdNomeUtenti.value()?.find(u => u.id === user_id)
                return nomeUtente?.name ?? 'Sconosciuto'
            },

            aggiungiPost: signalMethod<Omit<Post, 'id'>>((nuovoPost) => {
                http.post<Post>(`${authService.apiUrl}/users/${nuovoPost.user_id}/posts`, nuovoPost, {
                    headers: headersAutenticazione
                }).subscribe({
                    next: () => {
                        rispostaPost.reload();
                        toaster.successo('Post aggiunto con successo!')
                    },
                    error: (err) => {
                        patchState(store, { erroreAggiungiPost: `Errore nell'aggiunta del nuovo Post: ${err}` })
                        toaster.errore(`Errore: ${err}`)
                    }
                })
            }),
  
            cancellaPost: signalMethod<number>((idPost) => {
                http.delete<number>(`${authService.urlPost}/${idPost}`, {
                    headers: headersAutenticazione
                }).subscribe({
                    next: () => {
                        rispostaPost.reload()
                        toaster.successo('Post cancellato con successo!')
                    }
                })
            }),

        }
    }),

    withComputed((store) => ({
            
        // con Computed aggiorniamo il valore
        paginaPrecedente: computed(() => store.paginaCorrente() - 1),
        
        paginaSuccessiva: computed(() => store.paginaCorrente() + 1),
        
    }),
    ),

)