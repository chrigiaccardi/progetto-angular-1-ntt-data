import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-item-lista-utenti',
  imports: [MatIconModule],
  templateUrl: './item-lista-utenti.html',
  styleUrl: './item-lista-utenti.css',
})
export class ItemListaUtenti {
// inseriamo in input parametri con il binding dal parent dinamici
  nome = input<string | null>(null)
  stato = input<string | null>(null)
  email = input<string | null>(null)
  genere = input<string | null>(null)
  
  
}
