import { Component, inject, signal } from '@angular/core';
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
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-lista-utenti',
  imports: [CardDashboard, BtnIndietro, MatInputModule, MatButtonModule ,ItemListaUtenti, MatIconModule, MatProgressSpinnerModule, MatPrefix, MatSuffix, ReactiveFormsModule],
  templateUrl: './lista-utenti.html',
  styleUrl: './lista-utenti.css',
})
export default class ListaUtenti {
  // Iniettiamo utenti store e il matDialog per poterli utilizzare
  utentiStore = inject(UtentiStore)
  matDialog = inject(MatDialog)

  // Importiamo dallo store i seguenti valori
  itemXPagina = this.utentiStore.itemXPagina
  opzioniItemPagina = this.utentiStore.opzioniItemPagina;
  barraDiRicercaPost: any;
  postsStore: any;

  // Metodo per poter cambiare Il Numero di utenti visualizzati in base a quelli presenti,
  // Quindi il valore specifico di quel evento
  cambioItemPagina(event: Event) {
    const select = event.target as HTMLSelectElement;
    const nItem = select.value;
    this.utentiStore.itemPerPagina(Number(nItem))
  };

  // Metodo per poter aprire il dialog e dar la possibilità di chiuderlo cliccando fuori
  apriDialogAggiungiUtente() {
    this.matDialog.open(AggiungiUtenteDialog, {
      disableClose: false
    })
  };

  // Selezioniamo il form per la barra di ricerca
  barraDiRicercaUtenti = new FormControl<string>('', {
    nonNullable: true, // Possono esserci valori null e si resettano in automatico (nonNullableFormBuilder)
    validators: [Validators.minLength(2)] // la ricerca è valida solamente dopo i primi 2 caratteri - gestione performance
  });

  // Nel costruttore il valueChanges ontrolla il cambio valore della barra di ricerca con un debounce di 500 ms
  // dopo di chè manda la richiesta per il filtraggio degli utenti
  erroreRicerca = signal(false)
  constructor() {
    this.barraDiRicercaUtenti.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(testo => {
      if (this.barraDiRicercaUtenti.valid || testo === '') {
        this.erroreRicerca.set(false);
        this.utentiStore.setFiltroRicerca(testo)
      } else {
        this.erroreRicerca.set(true)
      }
    })
  }
}


