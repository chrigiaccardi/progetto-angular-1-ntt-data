import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from "@ngrx/signals"
import { AuthService } from "../services/auth-service/auth-service"
import { computed, inject, Signal } from "@angular/core"
import { HttpClient, HttpHeaders, httpResource } from "@angular/common/http"
import { Commento } from "../models/commento"
import { AggiungiPostDialog } from "../../features/dashboard/pages/lista-post/components/aggiungi-post-dialog/aggiungi-post-dialog"
import { Toaster } from "../services/toaster/toaster"


export type CommentoState = {
    postIdSelezionato: string | null;
    erroreAggiungiCommento: string;
}

export const CommentiStore = signalStore(
    { providedIn: 'root' },

    withState({
        postIdSelezionato: null,
        erroreAggiungiCommento: '',
    } as CommentoState),

    withMethods((store, authService = inject(AuthService), http = inject(HttpClient), toaster = inject(Toaster)) => {

        // Istanziamo headersAutenticazione per riutilizzarlo
        const headersAutenticazione = new HttpHeaders({
            'Authorization': `Bearer ${authService.tokenLocalStorage()}`
        });

        // Facciamo la richiesta al server per i commenti del post selezionato
        const rispostaCommenti = httpResource<Commento[]>(() => {
            const postID = store.postIdSelezionato()
            // l'if serve per far partire la richiesta solamente quando viene inserito un postID valido
            if (!postID) return undefined;

            return {
                url: `${authService.apiUrl}/posts/${postID}/comments`,
                method: 'GET',
                headers: headersAutenticazione
            }
        })

        return {

            commentiPost: rispostaCommenti.value,
            caricamentoCommenti: rispostaCommenti.isLoading,
            erroreCommenti: rispostaCommenti.error,
            
            // Il metodo setIDPost imposta lo state dello store
            setIdPost: signalMethod<string>((postId) => {
                patchState(store, {postIdSelezionato: postId})
            }),

            // caricare commenti fa il reload della risposta
            caricareCommenti: () => {
                rispostaCommenti.reload()
            },

            // Aggiungi commento dall'oggetto nuovo commento in entrata omette id perchè viene creato dal backend
            // il metodo post inserisce nel server nel server un nuovo elemento
            // il toaster manda un piccolo pop-up per la conferma
            aggiungiCommento: signalMethod<Omit<Commento, 'id'>>((nuovoCommento) => {
                http.post<Commento>(`${authService.apiUrl}/posts/${nuovoCommento.post_id}/comments`, nuovoCommento, {
                    headers: headersAutenticazione
                }).subscribe({
                    next: () => {
                        rispostaCommenti.reload()
                        toaster.successo('Commento aggiunto con successo!')
                    },
                    error: (err) => {
                        patchState(store, { erroreAggiungiCommento: `Errore nell'aggiunta del commento: ${err}` })
                        toaster.errore(`Errore, commento non aggiunto: ${err}`,)
                    }
                })
            })
           
        }
    }),

    withComputed((store) => ({
        // Troviamo il numero di commenti presenti
        numeroCommenti: computed(() => store.commentiPost()?.length)
    }))
)