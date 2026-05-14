import { Component, inject, input } from '@angular/core';
import { Post } from '../../../../../../core/models/post';
import { UtentiStore } from '../../../../../../core/store/utenti-store';
import { PostsStore } from '../../../../../../core/store/posts-store';

@Component({
  selector: 'app-card-post',
  imports: [],
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
  

}
