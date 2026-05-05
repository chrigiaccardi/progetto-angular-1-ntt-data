import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'
import { Utente } from '../models/utente';
import { computed, inject } from '@angular/core';
import { HttpHeaders, httpResource } from '@angular/common/http';
import { AuthService } from '../services/auth-service/auth-service';

export type UtentiState = {
    utenteCorrente: Utente | null;
    totaleUtenti: number;
    paginaCorrente: number;
    itemPerPagina: number;
}

export const UtentiStore = signalStore(

    { providedIn: 'root' },

    withState({
        utenteCorrente: null,
        totaleUtenti: 0,
        paginaCorrente: 1,
        itemPerPagina: 10,
    } as UtentiState),


    withMethods((store, authService = inject(AuthService)) => {

        const rispostaUtenti = httpResource<Utente[]>(() => ({
            url: `${authService.url}?page=${store.paginaCorrente()}&per_page=${store.itemPerPagina()}`,
            method: 'GET',
            headers: new HttpHeaders({
                'Authorization': `Bearer ${authService.tokenLocalStorage()}`
            })
        }));
        return {
            utenti: rispostaUtenti.value,
            caricamento: rispostaUtenti.isLoading,
            errore: rispostaUtenti.error,
            caricareListaUtenti: () => {
                rispostaUtenti.reload();
            },
            andareAPagina: (numeroPagina: number) => {
                patchState(store, {paginaCorrente: numeroPagina})
            },
            
        }
    }),

        withComputed((store) => ({

        contatoreUtenti: computed(() => store.utenti()?.length ?? 0),

        utenteCaricato: computed(() => store.utenteCorrente !== null),
    }),
    ),
)