import { Component, input } from '@angular/core';
import { Commento } from '../../../../../../../core/models/commento';

@Component({
  selector: 'app-lista-commenti-post',
  imports: [],
  templateUrl: './lista-commenti-post.html',
  styleUrl: './lista-commenti-post.css',
})
export class ListaCommentiPost {
  // Riceviamo in ingresso i dati del commento
  commento = input.required<Commento>()
}
