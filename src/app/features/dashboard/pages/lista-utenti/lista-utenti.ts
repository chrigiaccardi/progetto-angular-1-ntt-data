import { Component, inject } from '@angular/core';
import { UtentiStore } from '../../../../core/store/utenti-store';
import { CardDashboard } from '../../../../shared/directives/card-dashboard';

@Component({
  selector: 'app-lista-utenti',
  imports: [CardDashboard],
  templateUrl: './lista-utenti.html',
  styleUrl: './lista-utenti.css',
})
export class ListaUtenti {
  utentiStore = inject(UtentiStore)
}
