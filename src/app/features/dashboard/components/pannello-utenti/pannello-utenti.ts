import { Component, input } from '@angular/core';
import { PannelloDashboard } from '../../../../shared/directives/pannello-dashboard';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pannello-utenti',
  imports: [PannelloDashboard, MatButtonModule],
  templateUrl: './pannello-utenti.html',
  styleUrl: './pannello-utenti.css',
})
export class PannelloUtenti {
  titolo = input.required<string>()
}
