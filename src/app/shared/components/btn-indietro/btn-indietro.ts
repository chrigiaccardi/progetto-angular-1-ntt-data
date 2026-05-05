import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-btn-indietro',
  imports: [RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './btn-indietro.html',
  styleUrl: './btn-indietro.css',
})
export class BtnIndietro {
  // creiamo andareVerso per avere il bottone dinamico riutilizzabile
  andareVerso = input<string | null>(null)
}
