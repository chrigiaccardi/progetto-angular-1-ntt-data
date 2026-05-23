// TestBed serve a creare l'ambiente di test
import { TestBed } from "@angular/core/testing";
import { UtentiStore } from "./utenti-store";
import { Utente } from "../../models/utente";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { firstValueFrom } from "rxjs";
import { AuthService } from "../../services/auth-service/auth-service";

// describe raggruppa i test che appartengono allo stesso argomento
// Test che riguardano utentiStore
describe('UtentiStore', () => {
    // Instanziamo ora la variabile e la dichiariamo dentro il beforeEach
    // Utilizziamo InstanceType per tipizzare l'istanza con il tipo restituito da UtentiStore
    // UtentiStore token/provider che passiamo ad angular
    // Typeof la tipologia
    // InstanceType tipo di oggetto che ricevo quando angular lo inietta
    let store: InstanceType<typeof UtentiStore>;
    let httpTesting: HttpTestingController;
    let authService: AuthService

    // Creiamo un adminFinto da poter utilizzare
    const adminFinto: Utente = {
        id: '1',
        name: 'Admin',
        email: 'admincitysharehub@admin.it',
        gender: 'male',
        status: 'active',
    }
    // Creiamo utenteFinto da poter utilizzare
    const utenteFake: Omit<Utente, 'id'> = {
        name: 'Mario',
        email: 'mr@mr.com',
        gender: 'male',
        status: 'inactive'
    }
    const utenteCreatoFake: Utente = {
        id: '123',
        ...utenteFake
    }
    let idUtente: string = '123';
    let err : string = 'Authorization header is missing or the token is invalid'

    // Blocco eseguito prima di ogni Test it, non lo ripetiamo sempre,
    // ed a ogni test abbiamo l'ambiente pulito
    beforeEach(() => {
        // Si configura l'ambiente con il provider così angular sa dove recuperarlo
        TestBed.configureTestingModule({
            providers: [
                UtentiStore,
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });
        // Recuperiamo UtentiStore e lo assegnamo a store
        store = TestBed.inject(UtentiStore);
        httpTesting = TestBed.inject(HttpTestingController)
        authService = TestBed.inject(AuthService)
    });

    // Controlliamo che alla fine non rimangono richieste http pendenti
    afterEach(() => {
        httpTesting.verify();
    })

    // Test: partiamo dai più semplici ad arrivare a quelli più complicati
    it('Dovrebbe essere Creato', () => {
        expect(store).toBeTruthy();
    });
    
    it('setFiltroRicerca deve impostare paginaCorrente 1 e filtroRicerca con valore in ingresso', () => {
        // Impostiamo valori diversi per vedere se vengano cambiati
        store.setFiltroRicerca('Davide');
        store.andareAPagina(3);

        // Settiamo il nuovo valore, non viene messo paginaCorrente perchè già nel metodo lo settiamo a 1
        store.setFiltroRicerca('Mario');

        // Controlliamo che i valori siano giusti: Mario ricerca e 1 paginaCorrente
        expect(store.filtroRicerca()).toBe('Mario');
        expect(store.paginaCorrente()).toBe(1);
    });

    it('setIdUtente imposta selezioneIdUtente', () => {
        store.setIdUtente('842545')
        expect(store.selezioneIdUtente()).toBe('842545')
    });

    it('paginaPrecedente / paginaSuccessiva calcolano paginaCorrente', () => {
        store.andareAPagina(3)
        expect(store.paginaPrecedente()).toBe(2)
        expect(store.paginaSuccessiva()).toBe(4)
    });

    it('controlloAdmin se esiste return admin',
        async () => {
            
            // Istanziamo il primo risultato che arriva dal metodo
            const risultatoPromise = firstValueFrom(store.controlloAdmin());

            // Intercettiamo la richiesta e mi aspetto che sia fatta con il metodo GET,
            // utilizziamo un matcher per impostare il parametrio email
            const richiestaGET = httpTesting.expectOne((richiesta) => 
                richiesta.method === 'GET' && 
                richiesta.url === authService.urlUtenti &&
                richiesta.params.get('email') === store.ADMIN_EMAIL()
            )
      
            // Intercettata la richiesta mettiamo come risultato con .flush un array con admin finto dentro.
            // In questo modo cerca admin restituisce questo visto che deve restituire un Observable <Utente[]>
            richiestaGET.flush([adminFinto])
            
            // A sto punto il risultato è l'await di risultatoPromise
            const risultatoFinale = await risultatoPromise
        
            // In conclusione ci aspettiamo che il risultato finale sia uguale ad adminFinto
            expect(risultatoFinale).toEqual(adminFinto)
        }
    );
    
    it('controlloAdmin, se non esiste lo crea',
        async () => {
            const risultatoPromise = firstValueFrom(store.controlloAdmin());
            // Test GET
            const richiestaGET = httpTesting.expectOne((richiesta) => 
                richiesta.method === 'GET' && 
                richiesta.url === authService.urlUtenti &&
                richiesta.params.get('email') === store.ADMIN_EMAIL()
            )
            richiestaGET.flush([])
            // Test Post
            const richiestaPOST = httpTesting.expectOne({ method: 'POST', url: authService.urlUtenti })
            richiestaPOST.flush(adminFinto)
            
            const risultatoFinale = await risultatoPromise
            expect(risultatoFinale).toEqual(adminFinto)
        }
    );

    it('controlloAdmin catchErrore',
        async () => {
            const risultatoPromise = firstValueFrom(store.controlloAdmin());
            // Impostiamo l'array vuoto per entrare nel post
            const richiestaGET = httpTesting.expectOne((richiesta) => 
                richiesta.method === 'GET' && 
                richiesta.url === authService.urlUtenti &&
                richiesta.params.get('email') === store.ADMIN_EMAIL()
            )
            richiestaGET.flush([])

            // Impostiamo l'errore nella richiesta
            const richiestaPOST = httpTesting.expectOne({ method: 'POST', url: authService.urlUtenti })
            richiestaPOST.flush('Errore server', {
                status: 500,
                statusText: 'Internal Server Error'
            })

            // Verifichiamo che la promis fallisca
            await expect(risultatoPromise).rejects.toThrow()

            expect(store.erroreAggiungiUtente()).toContain('Errore nella creazione Admin')
        }
    );

    it('Dovrebbe creare un nuovo utente', () => {
        // Facciamo partire il metodo con l'utenteFake in ingresso
        store.aggiungiUtente(utenteFake)
        // Intercettiamo la richiesta
        const richiestaPOST = httpTesting.expectOne({ method: 'POST', url: authService.urlUtenti })
        // Ci aspettiamo che la richiesta sia utenteFake e che ritorni utenteCreatoFake
        expect(richiestaPOST.request.body).toEqual(utenteFake);
        richiestaPOST.flush(utenteCreatoFake)
    });

    it('Errore aggiungiUtente', () => {
        store.aggiungiUtente(utenteFake)
        const richiestaPOST = httpTesting.expectOne({ method: 'POST', url: authService.urlUtenti })
        // Qua inseriamo volutamente un errore di autenticazione
        richiestaPOST.flush('Errore Autorizzazione', {
            status: 401,
            statusText: 'Authorization header is missing or the token is invalid'
        })
        // Ci aspettiamo che l'errore faccia si che si aggiorni erroreAggiuntaUtente con il seguente messaggio
        expect(store.erroreAggiungiUtente()).toContain(`Errore nell'aggiunta del nuovo utente`)
    })

    it('Dovrebbe cancellare utente selezionato', () => {
        store.cancellaUtente(idUtente)
        const richiestaDELETE = httpTesting.expectOne({ method: 'DELETE', url: `${authService.urlUtenti}/${idUtente}` })
        // La richiesta ritorna null vista la cancellazione dell'utente selezionato
        richiestaDELETE.flush(null)
    })
})
