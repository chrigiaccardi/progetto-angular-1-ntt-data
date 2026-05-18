import { Component, inject, input, signal } from '@angular/core';
import { Post } from '../../../../../../core/models/post';
import { UtentiStore } from '../../../../../../core/store/utenti-store';
import { PostsStore } from '../../../../../../core/store/posts-store';
import { RouterLink } from "@angular/router";
import { MatMiniFabButton } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CommentiStore } from '../../../../../../core/store/comments-store';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ListaCommentiPost } from "./lista-commenti-post/lista-commenti-post";
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { Commento } from '../../../../../../core/models/commento';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-card-post',
  imports: [RouterLink, MatButtonModule, MatInputModule, MatIconModule, MatProgressSpinnerModule, ListaCommentiPost, FormsModule, MatFormFieldModule, ReactiveFormsModule, MatMiniFabButton],
  templateUrl: './card-post.html',
  styleUrl: './card-post.css',
})
export class CardPost {
  // Istanziamo l'input per il binding di informazioni
  post = input.required<Post>()
  //Iniettiamo gli store per poterli utilizzare
  utentiStore = inject(UtentiStore)
  postsStore = inject(PostsStore)
  commentiStore = inject(CommentiStore)

  // Utilizziamo espansione per leggere tutto il post o meno
  espansione = signal(false)
  leggiTutto() {
    this.espansione.update(esp => !esp)
  }

  // Utilizziamo CommentiOn per mostrare o no la sezione commenti
  commentiOn = signal(false)
  apriCommenti() {
    this.commentiOn.update(on => !on)
  }

  // Form per l'aggiunta del commento
  formBuilder = inject(NonNullableFormBuilder)
  aggiungiCommentoForm = this.formBuilder.group({
    body: this.formBuilder.control<string>('', [Validators.required])
  })

  // Creiamo il metodo per aggiungere il commento
  aggiungiCommento() {
    const commentoData = this.aggiungiCommentoForm.getRawValue();

    this.utentiStore.controlloAdmin().subscribe({
      next: (admin) => {
        const nuovoCommento: Omit<Commento, 'id'> = {
          post_id: this.post().id,
          name: admin.name,
          email: admin.email,
          body: commentoData.body
        }
        this.utentiStore.caricareListaUtenti();
        this.commentiStore.aggiungiCommento(nuovoCommento)
      }
    })
    this.aggiungiCommentoForm.reset();
  }
}
