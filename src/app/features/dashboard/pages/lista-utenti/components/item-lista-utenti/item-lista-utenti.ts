import { Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Utente } from '../../../../../../core/models/utente';
import { RouterLink } from '@angular/router';
import { PipeStatoPipe } from "../../../../../../shared/pipes/pipe-stato-pipe";
import { UtentiStore } from '../../../../../../core/store/utenti-store';
import { PostsStore } from '../../../../../../core/store/posts-store';

@Component({
  selector: 'app-item-lista-utenti',
  imports: [MatIconModule, RouterLink, PipeStatoPipe],
  templateUrl: './item-lista-utenti.html',
  styleUrl: './item-lista-utenti.css',
})
export class ItemListaUtenti {
  // inseriamo in input parametri con il binding dal parent dinamici
  utente = input.required<Utente>()

  // Iniettiamo il postStore per poterlo utilizzare
  postsStore = inject(PostsStore)
  
  // iniettiamo lo store utenti per poterlo utilizzare
  utentiStore = inject(UtentiStore)

  // Creiamo il metodo per poter cancellare l'utente
  cancellaUtente(idUtente: number) {
    this.utentiStore.cancellaUtente(idUtente)
  }
}
