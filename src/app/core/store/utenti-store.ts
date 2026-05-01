import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'
import { Utente } from '../models/utente';
import { computed, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth-service/auth-service';

export type UtentiState = {
    utenti: Utente[];
    utenteCorrente: Utente | null;
    caricamento: boolean
    errore: string | null
    totaleUtenti: number;
    paginaCorrente: number;
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
    } as UtentiState),

    withComputed((store) => ({

        contatoreUtenti: computed(() => store.utenti().length),

        utenteCaricato: computed(() => store.utenteCorrente !== null),
    }),
    ),

    withMethods((store, http = inject(HttpClient), authService = inject(AuthService)) => ({
        
        caricareListaUtenti: signalMethod(
            (source) => source,
            (page: number = 1, per_page: number = 20) => {
                const url = `https://gorest.co.in/public/v2/users?page=${page}&per_page=${per_page}`;
                const headers = new HttpHeaders({
                    'Authorization': `Bearer &{authService.tokenLocalStorage}`
                });
                return http.get<Utente[]>(url, {headers})
            }
        )
    
}))
)


