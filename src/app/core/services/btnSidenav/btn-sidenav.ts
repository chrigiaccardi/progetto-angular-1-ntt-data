import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BtnSidenav {
  // Apertura e chiusura della sidenav
  sidenavAperta = false

  toggleSidenav() {
    this.sidenavAperta = !this.sidenavAperta;
  }
}
