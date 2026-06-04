import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth-service';
import { provideRouter, Router } from '@angular/router';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router
  let httpTesting: HttpTestingController

  // Creiamo describe separati visto il test del costruttore
  describe('Constructor - Token presente', () => {
    let serviceToken: AuthService

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          AuthService,
          provideRouter([]),
          // Inseriamo HttpClientTesting nel provider per la creazione del componente ma,
          // non usandolo da nessuna parte non ci serve iniettarlo.
          provideHttpClientTesting() 
        ]
      });
      // Preparo il localStorage con il token
      const tokenLS = '123abc'
      localStorage.setItem('tokenDiAccesso', tokenLS)
      // Creo il Service
      serviceToken = TestBed.inject(AuthService)
    })
    afterEach(() => {
      // Dopo ogni test rimuoviamo il token dal localStorage
      localStorage.removeItem('tokenDiAccesso')
    })

    it('Dovrebbe recuperare il token e impstare utenteLogato a true', () => {
      expect(serviceToken.token()).toBe('123abc')
      expect(serviceToken.utenteLoggato()).toBe(true)
    })
  })

  describe('Constructor - Token assente', () => {
    let serviceNoToken: AuthService
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          AuthService,
          provideHttpClientTesting(),
          provideRouter([])
        ]
      });
      localStorage.removeItem('tokenDiAccesso')
      serviceNoToken = TestBed.inject(AuthService)
    })
    afterEach(() => {
      localStorage.clear()
    })

    it('Dovrebbe lasciare token null e utenteLoggato false', () => {
      expect(serviceNoToken.token()).toBe(null)
      expect(serviceNoToken.utenteLoggato()).toBe(false)
    })
  })

  describe('Altri Test AuthService', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          AuthService,
          provideRouter([]),
          provideHttpClientTesting()
        ]
      });
      service = TestBed.inject(AuthService);
      router = TestBed.inject(Router);
      httpTesting = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('Logout dovrebbe cancellare utente loggato', () => {
      // Definisco il valore di tokenS
      const tokenS = '123abc'
      // Creo un mock come se l'utente fosse loggato
      service.token.set(tokenS)
      service.utenteLoggato.set(true)
      service.codiceErrore.set(401)
      localStorage.setItem('tokenDiAccesso', tokenS)
      // Spiamo router navigate 
      const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true)
      // Eseguiamo il metodo Logout()
      service.logout()
      // Verifichiamo gli effetti
      expect(service.token()).toBe(null)
      expect(service.utenteLoggato()).toBe(false)
      expect(service.codiceErrore()).toBe(null)
      expect(localStorage.getItem('tokenDiAccesso')).toBe(null)
      expect(navigateSpy).toHaveBeenCalledWith(['/login'])
    })

    it('verificaToken con 200 dovrebbe salvare il token e navigare verso dashboard', () => {
      // definisco i valori prima del metodo
      const tokenLS = '123abc'
      service.codiceErrore.set(401)
      // Spiamo la navigazione
      const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true)
      // Facciamo partire il metodo
      service.verificaBearerToken(tokenLS)
      // Intercettiamo la richiesta che ha come metodo GET e url.utenti
      const richiestaGET = httpTesting.expectOne({ method: 'GET', url: service.urlUtenti })
      // Diamo come risposta della richiesta stato 200
      richiestaGET.flush('Risposta positiva', {
        status: 200,
        statusText: 'Token Valido'
      })
      // Controlliamo che i valori finali siano giusti
      expect(service.token()).toBe(tokenLS)
      expect(service.utenteLoggato()).toBe(true)
      expect(localStorage.getItem('tokenDiAccesso')).toBe(tokenLS)
      expect(navigateSpy).toHaveBeenCalledWith(['/dashboard'])
      expect(service.codiceErrore()).toBe(null)
      expect(richiestaGET.request.method).toBe('GET')
    })

  })
 
});

