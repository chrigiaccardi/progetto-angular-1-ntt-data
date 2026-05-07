import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'
import { Utente } from '../models/utente';
import { computed, inject } from '@angular/core';
import { HttpHeaders, httpResource } from '@angular/common/http';
import { AuthService } from '../services/auth-service/auth-service';

export type UtentiState = {
    utenteCorrente: Utente | null;
    totaleUtenti: number;
    paginaCorrente: number;
    itemXPagina: number;
    opzioniItemPagina: number[];
    selezioneIdUtente: string | undefined;
}

export const UtentiStore = signalStore(

    { providedIn: 'root' },

    withState({
        utenteCorrente: null,
        totaleUtenti: 0,
        paginaCorrente: 1,
        itemXPagina: 5,
        opzioniItemPagina: [5, 10, 20, 50],
        selezioneIdUtente: undefined
    } as UtentiState),


    withMethods((store, authService = inject(AuthService)) => {
        // Utilizziamo httpResource per semplificare l'aggiornamento signal
        // avere in automatico valore richiesta, boolean per il caricamento
        // e il codice errore nel caso di malfunzionamento
        const rispostaUtenti = httpResource<Utente[]>(() => ({
            url: `${authService.url}?page=${store.paginaCorrente()}&per_page=${store.itemXPagina()}`,
            method: 'GET',
            headers: new HttpHeaders({
                'Authorization': `Bearer ${authService.tokenLocalStorage()}`
            })
        }));

        // In questo caso, visto la logica condizionale all'interno viene inserito il return al posto
        //  di restituire direttamente l'oggetto
        const rispostaDettagliUTente = httpResource<Utente>(() => {
            const idUtente = store.selezioneIdUtente();

            if (!idUtente) return { url: '' };

            return {
                url: `${authService.url}/${idUtente}`,
                method: 'GET',
                headers: new HttpHeaders({
                    'Authorizazion': `Bearer ${authService.tokenLocalStorage()}`
                })
            }
        })

        // nel return finale esportiamo i vari valori e colleghiamo i vari metodi di utilizzo
        return {
            utenti: rispostaUtenti.value,
            caricamento: rispostaUtenti.isLoading,
            errore: rispostaUtenti.error,

            dettagliUtente: rispostaDettagliUTente.value,
            caricamentoDettagliUtente: rispostaDettagliUTente.isLoading,
            erroreDettaliUtente: rispostaDettagliUTente.error,

            caricareListaUtenti: () => {
                rispostaUtenti.reload();
            },
            andareAPagina: signalMethod((numeroPagina: number) => {
                patchState(store, {paginaCorrente: numeroPagina})
            }),
            itemPerPagina: signalMethod<number>((nItem: number) => {
                patchState(store, {itemXPagina: nItem})
            }),
            setIdUtente: signalMethod<string>((idUtente: string) => {
                patchState(store, {selezioneIdUtente: idUtente})
            })
            
        }
    }),

    withComputed((store) => ({
            
        // con Computed aggiorniamo il valore
        paginaPrecedente: computed(() => store.paginaCorrente() - 1),
        
        paginaSuccessiva: computed(() => store.paginaCorrente() + 1),
        
    }),
    ),
)