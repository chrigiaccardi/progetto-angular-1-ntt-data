
import { TestBed } from '@angular/core/testing'; // TestBed è l'ambiente di test di Angular
import { AuthGuard } from './auth-guard'; // AuthGuard è una funzione quindi la testiamo in modo differente
import { provideRouter, Router } from '@angular/router'; // provideRouter serve a fornire un router finto dentro il testBed
import { AuthService } from '../auth-service/auth-service'; // Servizio che utilizziamo per vedere se l'utente è loggato

// Test per testare la logica e visualizzare che:
// restituisce true se l'utente è loggato
// Invece False rimanda l'utente a login

// Describe raggruppa tutti i test che riguardano la guard
describe('AuthGuard', () => {

  // Variabili condivise che utilizzaremo per i test
  let router: Router
  let authService: AuthService

  // beforeEach è un blocco che viene eseguito sempre prima di OGNI test
  beforeEach(() => {
    TestBed.configureTestingModule({ // configureTestingModule crea un ambiente pulito e fresco per ogni test
      providers: [ // authService e provideRouter vngono messi dentro provides cosi che siano utilizzabili sempre
        AuthService,
        provideRouter([])
      ]
    });

    // istanziamo i servizi che dobbiamo utilizzare dentro i test
    router = TestBed.inject(Router)
    authService = TestBed.inject(AuthService)
  });

  // 1o Test: inseriamo il nome/descrizione del comportamento che vogliamo verificare
  it('Dovrebbe restituire true se utente è loggato', () => {
    // vi.spyON (vi per Vitest) intercetta il metodo utenteLoggato e restituisce true
    vi.spyOn(authService, 'utenteLoggato').mockReturnValue(true);
    // runInInjectContext è necessario perchè guard utilizza inject(..) se no darebbe errore
    // passiamo due oggetto any vuoti perchè guard richiede due parametri route e state
    const result = TestBed.runInInjectionContext(() => AuthGuard({} as any, {} as any));

    // ci aspettiamo che il risultato deve essere true
    expect(result).toBe(true)
  });

  // 2o Test: Descrizione di cosa vogliamo verificare
  it('Restituisce false e naviga verso login', () => {
    // al contrario ora testiamo se l'utenteLoggato è false
    vi.spyOn(authService, 'utenteLoggato').mockReturnValue(false);
    // Utilizziamo mockResolvedValue perchè navigate restituisce una Promise<boolean>
    const spyNavigazione = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    const result = TestBed.runInInjectionContext(() => AuthGuard({} as any, {} as any));

    expect(result).toBe(false);
    // ci aspettiamo che l'utente venga mandato a questa precisa route
    expect(spyNavigazione).toHaveBeenCalledWith(['/login'])
  })
  
});
