import { Component, inject, input } from '@angular/core';
import { UtentiStore } from '../../../../core/store/utenti-store';
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CardDashboard } from "../../../../shared/directives/card-dashboard";
import { BtnIndietro } from "../../../../shared/components/btn-indietro/btn-indietro";
import { PipeStatoPipe } from "../../../../shared/pipes/pipe-stato-pipe";
import { MatButtonModule } from "@angular/material/button";
import { PostsStore } from '../../../../core/store/posts-store';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommentiStore } from '../../../../core/store/comments-store';
import { ListaCommentiPost } from "../lista-post/components/card-post/lista-commenti-post/lista-commenti-post";
import { NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Commento } from '../../../../core/models/commento';
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatMiniFabButton } from "@angular/material/button";
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dettagli-utente',
  imports: [MatIconModule, MatProgressSpinnerModule, CardDashboard, BtnIndietro,
    PipeStatoPipe, MatButtonModule, MatExpansionModule, ListaCommentiPost, MatFormField,
    MatFormFieldModule, ReactiveFormsModule, MatMiniFabButton, MatInputModule],
  templateUrl: './dettagli-utente.html',
  styleUrl: './dettagli-utente.css',
})
export default class DettagliUtente {
  // Iniettiamo lo store per poterlo utilizzare
  utentiStore = inject(UtentiStore)
  postsStore = inject(PostsStore)
  commentiStore = inject(CommentiStore)

  // idUtente in input con il binding impostato nel config inserisce direttamente nella route l'id dell'utente
  idUtente = input.required<string>();

  constructor() {
    this.utentiStore.setIdUtente(this.idUtente)
    this.postsStore.setIdUtente(this.idUtente)
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
          post_id: '',
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
