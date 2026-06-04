import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth-service';
import { provideRouter, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router

  // Creiamo describe separati visto il test del costruttore
  describe('Constructor - Token presente', () => {
    let serviceToken: AuthService
    let http: HttpClient

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          AuthService,
          provideRouter([])
        ]
      });
      // Preparo il localStorage con il token
      const tokenLS = '123abc'
      localStorage.setItem('tokenDiAccesso', tokenLS)
      // Creo il Service
      serviceToken = TestBed.inject(AuthService)
      http = TestBed.inject(HttpClient)
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

  describe('Altri Test AuthService', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          AuthService,
          provideRouter([])
        ]
      });
      service = TestBed.inject(AuthService);
      router = TestBed.inject(Router)
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

  })
 
});

