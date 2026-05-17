import { Component, inject, input, signal } from '@angular/core';
import { BtnIndietro } from "../../../../shared/components/btn-indietro/btn-indietro";
import { CardDashboard } from "../../../../shared/directives/card-dashboard";
import { PostsStore } from '../../../../core/store/posts-store';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CardPost } from "./components/card-post/card-post";
import { MatIconModule } from "@angular/material/icon";
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { MatSuffix, MatPrefix } from '@angular/material/input';
import { AggiungiPostDialog } from './components/aggiungi-post-dialog/aggiungi-post-dialog';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-lista-post',
  imports: [BtnIndietro, CardDashboard, MatProgressSpinnerModule, CardPost, MatIconModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatPrefix, MatSuffix],
  templateUrl: './lista-post.html',
  styleUrl: './lista-post.css',
})
export default class ListaPost {
  // Iniettiamo postStore per poterlo utilizzare
  postsStore = inject(PostsStore)
  matDialog = inject(MatDialog)

  // Importiamo dallo store i seguenti valori
  itemXpagina = this.postsStore.itemXPagina;
  opzioniItemPagina = this.postsStore.opzioniItemPagina;

  // Metodo per poter cambiare Il Numero di post visualizzati in base a quelli presenti,
  // Quindi il valore specifico di quel evento
  cambioItemPagina(event: Event) {
    const select = event.target as HTMLSelectElement;
    const nItem = select.value;
    this.postsStore.itemPerPagina(Number(nItem))
  };

  // Selezioniamo il form per la barra di ricerca
  barraDiRicercaPost = new FormControl<string>('', {
    nonNullable: true, // Possono esserci valori null e si resettano in automatico (nonNullableFormBuilder)
    validators: [Validators.minLength(2)] // la ricerca è valida solamente dopo i primi 2 caratteri - gestione performance
  });

  erroreRicerca = signal(false)

    // Metodo ricerca per il bottone
  onRicercaClick() {
    // Controlla che il form sia valido
    if (this.barraDiRicercaPost.invalid) {
      this.erroreRicerca.set(true)
      return
    }
    // Prendiamo il valore dal form
    const testoRicerca = this.barraDiRicercaPost.value;
    // Chiamiamo il metodo nello store
    this.postsStore.setFiltroRicerca(testoRicerca);
  };

  apriDialogAggiungiPost() {
    this.matDialog.open(AggiungiPostDialog, {
      disableClose: false
    })
  };
}
