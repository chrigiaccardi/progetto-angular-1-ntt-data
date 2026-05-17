import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostsStore } from '../../../../../../core/store/posts-store';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { UtentiStore } from '../../../../../../core/store/utenti-store';


@Component({
  selector: 'app-aggiungi-post-dialog',
  imports: [MatDialogModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule,],
  templateUrl: './aggiungi-post-dialog.html',
  styleUrl: './aggiungi-post-dialog.css',
})
export class AggiungiPostDialog {
  // Iniettiamo il formerBuilder
  formBuilder = inject(NonNullableFormBuilder)

  // Iniettiamo lo store per poterlo utilizzare
  postsStore = inject(PostsStore)
  utentiStore = inject(UtentiStore)

  
  // Dichiariamo i campi del form
  // Validatori si accertano che siano validi i campi e obbligatori
  aggiungiPostForm = this.formBuilder.group({
    title: this.formBuilder.control<string>('', [Validators.required]),
    body: this.formBuilder.control<string>('', [Validators.required]),
  });

  aggiungiPost() {
    // Istanziamo i dati del form
    const postData = this.aggiungiPostForm.getRawValue()

    // Controlliamo che esista un admin nell'elenco utenti per creare il post
    
  }
}
