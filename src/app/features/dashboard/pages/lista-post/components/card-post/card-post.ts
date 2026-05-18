import { Component, inject, input, signal } from '@angular/core';
import { Post } from '../../../../../../core/models/post';
import { UtentiStore } from '../../../../../../core/store/utenti-store';
import { PostsStore } from '../../../../../../core/store/posts-store';
import { RouterLink } from "@angular/router";
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-card-post',
  imports: [RouterLink, MatAnchor],
  templateUrl: './card-post.html',
  styleUrl: './card-post.css',
})
export class CardPost {
  // Istanziamo l'input per il binding di informazioni
  post = input.required<Post>()
  //Iniettiamo l'utentiStore per poterlo utilizzare
  utentiStore = inject(UtentiStore)
  // Iniettiamo postStore per poterlo utilizzare
  postsStore = inject(PostsStore)

  // Utilizziamo espansione per leggere tutto il post o meno
  espansione = signal(false)
  leggiTutto() {
    this.espansione.update(esp => !esp)
  }

  // Utilizziamo CommentiOn per mostrare o no la sezione commenti
  commentiOn = signal(false)
}
