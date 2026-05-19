import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'
import { Utente } from '../models/utente';
import { computed, inject } from '@angular/core';
import { HttpClient, HttpHeaders, httpResource } from '@angular/common/http';
import { AuthService } from '../services/auth-service/auth-service';
import { catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { Toaster } from '../services/toaster/toaster';

export type UtentiState = {
    utenteCorrente: Utente | null;
    totaleUtenti: number;
    paginaCorrente: number;
    itemXPagina: number;
    opzioniItemPagina: number[];
    selezioneIdUtente: string | undefined;
    erroreAggiungiUtente: string;
    filtroRicerca: string;
    ADMIN_EMAIL: string;
}

export const UtentiStore = signalStore(

    { providedIn: 'root' },

    withState({
        utenteCorrente: null,
        totaleUtenti: 0,
        paginaCorrente: 1,
        itemXPagina: 5,
        opzioniItemPagina: [5, 10, 20, 50],
        selezioneIdUtente: undefined,
        erroreAggiungiUtente: '',
        filtroRicerca: '',
        ADMIN_EMAIL: 'admincitysharehub@admin.it'
    } as UtentiState),


    withMethods((store, authService = inject(AuthService), http = inject(HttpClient), toaster = inject(Toaster)) => {
        // Utilizziamo httpResource per semplificare l'aggiornamento signal
        // avere in automatico valore richiesta, boolean per il caricamento
        // e il codice errore nel caso di malfunzionamento

        const headersAutenticazione = new HttpHeaders({
            'Authorization': `Bearer ${authService.tokenLocalStorage()}`
        })

        const creaAdmin = () => {
            return http.post<Utente>(authService.urlUtenti, {
                name: 'Admin CityShare Hub',
                email: store.ADMIN_EMAIL(),
                gender: 'male',
                status: 'active',
            }, { headers: headersAutenticazione }
            )
        }

        const cercaAdmin = () => {
            return http.get<Utente[]>(authService.urlUtenti, {
                params: { email: store.ADMIN_EMAIL() },
                headers: headersAutenticazione
            })
        }
        
        const rispostaUtenti = httpResource<Utente[]>(() => ({
            url: authService.urlUtenti,
            method: 'GET',
            params: {
                page: store.paginaCorrente(),
                per_page: store.itemXPagina(),
                name: store.filtroRicerca(),
            },
            headers: headersAutenticazione
        }));

        // In questo caso, visto la logica condizionale all'interno viene inserito il return al posto
        //  di restituire direttamente l'oggetto
        const rispostaDettagliUTente = httpResource<Utente>(() => {
            const idUtente = store.selezioneIdUtente();

            if (!idUtente) return undefined;

            return {
                url: `${authService.urlUtenti}/${idUtente}`,
                method: 'GET',
                headers: headersAutenticazione
            }
        });

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
                patchState(store, { paginaCorrente: numeroPagina })
            }),
            itemPerPagina: signalMethod<number>((nItem: number) => {
                patchState(store, { itemXPagina: nItem })
            }),
            setIdUtente: signalMethod<string>((idUtente: string) => {
                patchState(store, { selezioneIdUtente: idUtente })
            }),

            aggiungiUtente: signalMethod<Omit<Utente, 'id'>>((nuovoUtente) => {
                http.post<Utente>(authService.urlUtenti, nuovoUtente, {
                    headers: headersAutenticazione
                }).subscribe({
                    next: (utenteCreato) => {
                        rispostaUtenti.reload();
                        toaster.successo('Utente aggiunto con successo');
                        
                    },
                    error: (err) => {
                        patchState(store, { erroreAggiungiUtente: `Errore nell'aggiunta del nuovo utente: ${err}` })
                        toaster.errore(`Errore, Utente non aggiunto: ${err}`)
                    }
                })
            }),

            // Creiamo questo metodo per controllare se l'Admin è già esistente oppure no per la creazione del Post
            controlloAdmin(): Observable<Utente> {
                return cercaAdmin().pipe(
                    switchMap((utenti) => {
                        const utenteEsiste = utenti[0]
                        if (utenteEsiste) {
                            return of (utenteEsiste)
                        }
                        return creaAdmin().pipe(
                            tap(() => {
                                rispostaUtenti.reload();
                                toaster.successo('Admin creato con successo')
                            }),
                            catchError(err => {
                                patchState(store, { erroreAggiungiUtente: 'Errore nella creazione Admin' });
                                toaster.errore(`Errore nella creazione dell'Admin: ${err}`)
                                return throwError(() => err)
                            })
                        )
                    })
                )
            },

            cancellaUtente: signalMethod<string>((idUtente) => {
                http.delete<string>(`${authService.urlUtenti}/${idUtente}`, {
                    headers: headersAutenticazione
                }).subscribe({
                    next: () => {
                        rispostaUtenti.reload()
                        toaster.successo('Utente cancellato con successo')
                    }
                })
            }),

            setFiltroRicerca: signalMethod<string>((testo: string) => {
                patchState(store, {
                    filtroRicerca: testo,
                    paginaCorrente: 1,
                })
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