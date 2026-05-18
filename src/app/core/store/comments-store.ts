import { patchState, signalMethod, signalStore, withMethods, withState } from "@ngrx/signals"
import { AuthService } from "../services/auth-service/auth-service"
import { inject, Signal } from "@angular/core"
import { HttpClient, HttpHeaders, httpResource } from "@angular/common/http"
import { Commento } from "../models/commento"
import { AggiungiPostDialog } from "../../features/dashboard/pages/lista-post/components/aggiungi-post-dialog/aggiungi-post-dialog"

export type CommentoState = {
    postIdSelezionato: string | null;
}

export const CommentiStore = signalStore(
    { providedIn: 'root' },

    withState({
        postIdSelezionato: null,
    } as CommentoState),

    withMethods((store, authService = inject(AuthService), http = inject(HttpClient)) => {

        // Istanziamo headersAutenticazione per riutilizzarlo
        const headersAutenticazione = new HttpHeaders({
            'Authorization': `Bearer ${authService.tokenLocalStorage()}`
        })

        return {
            // Il metodo SelezionaPost imposta lo state dello store
            selezionaPost: signalMethod<string>((postId) => {
                patchState(store, {postIdSelezionato: postId})
            }),

            // caricareCommenti restituisce i commenti del post selezionato per effettuare la chiamata GET
            caricareCommenti: httpResource<Commento[]>(() => ({
                url: `${authService.apiUrl}/posts/${store.postIdSelezionato()}/comments`,
                method: 'GET',
                headers: headersAutenticazione
            }))
        }
    })
)