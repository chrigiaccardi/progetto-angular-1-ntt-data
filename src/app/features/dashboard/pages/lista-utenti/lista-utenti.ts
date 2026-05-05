import { Component, inject } from '@angular/core';
import { UtentiStore } from '../../../../core/store/utenti-store';
import { CardDashboard } from '../../../../shared/directives/card-dashboard';
import { BtnIndietro } from '../../../../shared/components/btn-indietro/btn-indietro';
import { MatInputModule } from "@angular/material/input";
import { ItemListaUtenti } from "./components/item-lista-utenti/item-lista-utenti";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-lista-utenti',
  imports: [CardDashboard, BtnIndietro, MatInputModule, MatButtonModule ,ItemListaUtenti, MatIconModule],
  templateUrl: './lista-utenti.html',
  styleUrl: './lista-utenti.css',
})
export class ListaUtenti {
  utentiStore = inject(UtentiStore)

  itemXPagina = this.utentiStore.itemPagina
  opzioniItemPagina = this.utentiStore.opzioniItemPagina

  cambioItemPagina(event: Event) {
    const select = event.target as HTMLSelectElement;
    const nItem = select.value;
    this.utentiStore.itemPerPagina(Number(nItem))
  }
}
