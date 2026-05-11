import { Component, inject } from '@angular/core';
import { UtentiStore } from '../../../../core/store/utenti-store';
import { CardDashboard } from '../../../../shared/directives/card-dashboard';
import { BtnIndietro } from '../../../../shared/components/btn-indietro/btn-indietro';
import { MatInputModule } from "@angular/material/input";
import { ItemListaUtenti } from "./components/item-lista-utenti/item-lista-utenti";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog'
import { AggiungiUtenteDialog } from './components/aggiungi-utente-dialog/aggiungi-utente-dialog';
import { MatSuffix, MatPrefix } from '@angular/material/input';

@Component({
  selector: 'app-lista-utenti',
  imports: [CardDashboard, BtnIndietro, MatInputModule, MatButtonModule ,ItemListaUtenti, MatIconModule, MatProgressSpinnerModule, MatPrefix, MatSuffix],
  templateUrl: './lista-utenti.html',
  styleUrl: './lista-utenti.css',
})
export default class ListaUtenti {
  // Iniettiamo utenti store e il matDialog per poterli utilizzare
  utentiStore = inject(UtentiStore)
  matDialog = inject(MatDialog)

  // Importiamo dallo store i seguenti valori
  itemXPagina = this.utentiStore.itemXPagina
  opzioniItemPagina = this.utentiStore.opzioniItemPagina

  // Metodo per poter cambiare Il Numero di utenti visualizzati in base a quelli presenti,
  // Quindi il valore specifico di quel evento
  cambioItemPagina(event: Event) {
    const select = event.target as HTMLSelectElement;
    const nItem = select.value;
    this.utentiStore.itemPerPagina(Number(nItem))
  }

  apriDialogAggiungiUtente() {
    this.matDialog.open(AggiungiUtenteDialog, {
      disableClose: false
    })
  }

}
