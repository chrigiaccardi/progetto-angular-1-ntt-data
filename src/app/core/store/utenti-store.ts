import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'
import { Utente } from '../models/utente';
import { computed, inject } from '@angular/core';
import { HttpHeaders, httpResource } from '@angular/common/http';
import { AuthService } from '../services/auth-service/auth-service';

export type UtentiState = {
    utenteCorrente: Utente | null;
    totaleUtenti: number;
    paginaCorrente: number;
    itemXPagina: number;
    opzioniItemPagina: number[]
}

export const UtentiStore = signalStore(

    { providedIn: 'root' },

    withState({
        utenteCorrente: null,
        totaleUtenti: 0,
        paginaCorrente: 2,
        itemXPagina: 5,
        opzioniItemPagina: [5,10,20,50]
    } as UtentiState),


    withMethods((store, authService = inject(AuthService)) => {

        const rispostaUtenti = httpResource<Utente[]>(() => ({
            url: `${authService.url}?page=${store.paginaCorrente()}&per_page=${store.itemXPagina()}`,
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
            itemPerPagina: (nItem: number) => {
                patchState(store, {itemXPagina: nItem})
            },
            
        }
    }),

        withComputed((store) => ({

        contatoreUtenti: computed(() => store.utenti()?.length ?? 0),

        utenteCaricato: computed(() => store.utenteCorrente !== null),
        
        paginaPrecedente: computed(() => store.paginaCorrente() - 1),
        
        paginaSuccessiva: computed(() => store.paginaCorrente() + 1),
        
        itemPagina: computed(() => store.itemXPagina()),
        
        opzioniItemPagina: computed(() => store.opzioniItemPagina())

    }),
    ),
)