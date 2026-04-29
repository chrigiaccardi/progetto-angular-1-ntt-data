import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pannello-dashboard',
  imports: [MatButtonModule],
  templateUrl: './pannello-dashboard.html',
  styleUrl: './pannello-dashboard.css',
})
export class PannelloDashboard {
  // Iniettiamo il titolo dal parent
  titolo = input.required<string>()
}
