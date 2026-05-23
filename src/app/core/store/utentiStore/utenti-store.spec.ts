// TestBed serve a creare l'ambiente di test
import { TestBed } from "@angular/core/testing";
import { UtentiStore } from "./utenti-store";
import { Utente } from "../../models/utente";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { firstValueFrom } from "rxjs";

// describe raggruppa i test che appartengono allo stesso argomento
// Test che riguardano utentiStore
describe('UtentiStore', () => {
    // Instanziamo ora la variabile e la dichiariamo dentro il beforeEach
    // Utilizziamo InstanceType per tipizzare l'istanza con il tipo restituito da UtentiStore
    // UtentiStore token/provider che passiamo ad angular
    // Typeof la tipologia
    // InstanceType tipo di oggetto che ricevo quando angular lo inietta
    let store: InstanceType<typeof UtentiStore>;
    let httpTesting: HttpTestingController

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
    });

    // Controlliamo che alla fine non rimangono richieste gttp pendenti
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

    it('paginaPrecedente / paginaSuccessiva aggiornano paginaCorrente', () => {
        store.andareAPagina(3)
        expect(store.paginaPrecedente()).toBe(2)
        expect(store.paginaSuccessiva()).toBe(4)
    });

    it('controlloAdmin se esiste return, se non esiste crea',
        async () => {
        // Creiamo un adminFinto da poter utilizzare
        const adminFinto: Utente = {
            id: '1',
            name: 'Admin',
            email: 'admincitysharehub@admin.it',
            gender: 'male',
            status: 'active',
        }
         
        // Istanziamo il primo risultato che arriva dal metodo
        const risultatoPromise = firstValueFrom(store.controlloAdmin());

        // Intercettiamo la richiesta e mi aspetto che sia fatta con il metodo GET
        const richiesta = httpTesting.expectOne((richiesta) => richiesta.method === 'GET')
      
        // Intercettata la richiesta mettiamo come risultato con .flush un array con admin finto dentro.
        // In questo modo cerca admin restituisce questo visto che deve restituire un Observable <Utente[]>
        richiesta.flush([adminFinto])
            
        // A sto punto il risultato è l'await di risultatoPromise
        const risultatoFinale = await risultatoPromise
        
        // In conclusione ci aspettiamo che il risultato finale sia uguale ad adminFinto
        expect(risultatoFinale).toEqual(adminFinto)
            


    })

    
})