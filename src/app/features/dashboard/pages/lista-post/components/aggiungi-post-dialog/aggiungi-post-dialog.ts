import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ɵInternalFormsSharedModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostsStore } from '../../../../../../core/store/posts-store';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
  selector: 'app-aggiungi-post-dialog',
  imports: [MatDialogModule, MatButtonModule, MatIconModule, ɵInternalFormsSharedModule, ReactiveFormsModule, MatFormFieldModule],
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
    title: this.formBuilder.control<string>('', [Validators.required]),
    body: this.formBuilder.control<string>('', [Validators.required])
  });

  aggiungiPost() {
    this.postsStore.aggiungiPost(this.aggiungiPostForm.getRawValue())
  }
}
