import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  // Iniettiamo HttpClient per fare le richieste HTTP al Backend
  http = inject(HttpClient)

  // Iniettiamo Router per la navigazione tra le pagine dell'app
  router = inject(Router)

  // Token di Autenticazione
  token = signal<string | null> (null)

  // userLoggato indica se l'utente è loggato oppure no
  userLoggato = signal<boolean>(false);

  // urlBase indica l'url di check per il bearer token
  url: string = 'https://gorest.co.in/public/v2/users';

  // Recuperiamo il CodiceErrore
  codiceErrore = signal<number | null>(null);

  private readonly CHIAVE_TOKEN = 'tokenDiAccesso'

  // Al caricamento recuperiamo il token dal localStorage e aggiorniamo il signal token
  constructor() {
    this.recuperaTokenDaLocalStorage();
  }
  
  // Recuperiamo il token dal LocalStorage
  private recuperaTokenDaLocalStorage(): void {
    const tokenSalvato = localStorage.getItem(this.CHIAVE_TOKEN);
    if (tokenSalvato) {
      this.token.set(tokenSalvato)
      this.userLoggato.set(true)
    }
  }


  // Salviamo il Token nel Local LocalStorage se codice positivo 200
  private salvataggioToken(token: string, codiceStato: number) {
    if (codiceStato === 200) {
    this.token.set(token)
    } else {
     this.codiceErrore.set(codiceStato)
  }
}

  // Con il metodo Verifica Bearer Token ritorniamo un boolean per verificare la veridicità del token
  verificaBearerToken(token: string):void {
    this.codiceErrore.set(null)
    
    const headers = new HttpHeaders({
        Autorizzazione: 'Bearer ${token}'
      })
    
    this.http.get<boolean>(this.url, {
      headers, observe: 'response'
    }).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.salvataggioToken(token, response.status);
          localStorage.setItem('tokenDiAccesso', token)
          this.userLoggato.set(true);
          this.router.navigate(['/dashboard']);
        } else {
          this.autenticazioneFallita(response.status)
        }
      },
      error: (error) => {
        this.autenticazioneFallita(error.status);
        this.codiceErrore.set(error.status);
      },
    })
  };

  // Metodo per il settaggio ad autenticazione fallita
  private autenticazioneFallita(codiceStato: number) {
    this.userLoggato.set(false);
    this.codiceErrore.set(codiceStato)
  };

  // Metodo Logout
  logout(): void {
    this.token.set(null);
    localStorage.removeItem('tokenDiAccesso')
    this.userLoggato.set(false);
    this.codiceErrore.set(null);
    this.router.navigate(['/login'])
  }



}
