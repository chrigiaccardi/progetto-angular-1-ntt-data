import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { PostsStore } from '../../../../../../core/store/posts-store';

@Component({
  selector: 'app-aggiungi-post-dialog',
  imports: [],
  templateUrl: './aggiungi-post-dialog.html',
  styleUrl: './aggiungi-post-dialog.css',
})
export class AggiungiPostDialog {
  // Iniettiamo il formerBuilder
  formBuilder = inject(NonNullableFormBuilder)
  // Iniettiamo lo store per poterlo utilizzare
  postsStore = inject(PostsStore)
  
  // Dichiariamo i campi del form
  // Validatori si accertano che siano validi i campi e obbligatori
  aggiungiPostForm = this.formBuilder.group({
    title: string,
    body: string,
    // O non mettiamo nulla e inserisce un post sconosciuto oppure mettiamo che 
    // bisogna prima creare il proprio utente e poi selezionarlo
  })
}
