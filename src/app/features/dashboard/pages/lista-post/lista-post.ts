import { Component, inject } from '@angular/core';
import { BtnIndietro } from "../../../../shared/components/btn-indietro/btn-indietro";
import { CardDashboard } from "../../../../shared/directives/card-dashboard";
import { PostsStore } from '../../../../core/store/posts-store';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CardPost } from "./components/card-post/card-post";

@Component({
  selector: 'app-lista-post',
  imports: [BtnIndietro, CardDashboard, MatProgressSpinnerModule, CardPost],
  templateUrl: './lista-post.html',
  styleUrl: './lista-post.css',
})
export default class ListaPost {
  // Iniettiamo postStore per poterlo utilizzare
  postsStore = inject(PostsStore)
}
