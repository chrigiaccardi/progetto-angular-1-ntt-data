import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CardDashboard } from '../../../../shared/directives/card-dashboard';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-pannello-dashboard',
  imports: [MatButtonModule, CardDashboard, RouterLink],
  templateUrl: './pannello-dashboard.html',
  styleUrl: './pannello-dashboard.css',
})
export class PannelloDashboard {
  // Iniettiamo il titolo dal parent
  titolo = input.required<string>()

  // andareVerso lo utilizziamo per avere il componente riutilizzabile
  andareVerso = input<string | null>(null)

}
