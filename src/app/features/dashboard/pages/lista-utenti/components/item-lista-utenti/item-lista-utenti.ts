import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Utente } from '../../../../../../core/models/utente';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-item-lista-utenti',
  imports: [MatIconModule, RouterLink],
  templateUrl: './item-lista-utenti.html',
  styleUrl: './item-lista-utenti.css',
})
export class ItemListaUtenti {
// inseriamo in input parametri con il binding dal parent dinamici
utente = input.required<Utente>()

}
