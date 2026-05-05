import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-item-lista-utenti',
  imports: [MatIconModule],
  templateUrl: './item-lista-utenti.html',
  styleUrl: './item-lista-utenti.css',
})
export class ItemListaUtenti {
  nome = input<string | null>(null)
  stato = input<string | null>(null)
  email = input<string | null>(null)
  
}
