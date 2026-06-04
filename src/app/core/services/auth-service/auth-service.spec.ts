import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth-service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
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

  })
});
