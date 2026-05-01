import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'
import { Utente } from '../models/utente';
import { computed, inject } from '@angular/core';
import { HttpClient, HttpHeaders, httpResource } from '@angular/common/http';
import { AuthService } from '../services/auth-service/auth-service';
import { catchError, of, tap } from 'rxjs';

export type UtentiState = {
    utenti: Utente[];
    utenteCorrente: Utente | null;
    caricamento: boolean
    errore: string | null
    totaleUtenti: number;
    paginaCorrente: number;
    perPage: number;
}

export const UtentiStore = signalStore(

    { providedIn: 'root' },

    withState({
        utenti: [],
        utenteCorrente: null,
        caricamento: false,
        errore: null,
        totaleUtenti: 0,
        paginaCorrente: 1,
        perPage: 20,
    } as UtentiState),

    withComputed((store) => ({

        contatoreUtenti: computed(() => store.utenti().length),

        utenteCaricato: computed(() => store.utenteCorrente !== null),
    }),
    ),

    withMethods((store, http = inject(HttpClient), authService = inject(AuthService)) => {
        
        const utentiRisposta = httpResource(() => {
                const url = `${authService.url}?page=${store.paginaCorrente()}&per_page=${store.perPage()}`;
                const headers = new HttpHeaders({
                    'Authorization': `Bearer ${authService.tokenLocalStorage}`
                });
            return {
                     caricamento: utentiRisposta.isLoading,
            errore: utentiRisposta.error,
                }
                );
            }
        )
})
)


