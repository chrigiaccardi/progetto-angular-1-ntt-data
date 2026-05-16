import { Component, inject} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';


@Component({
  selector: 'app-btn-indietro',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './btn-indietro.html',
  styleUrl: './btn-indietro.css',
})
export class BtnIndietro {
  // Iniettiamo Location per rendere dinamico il btn indietro alla pagina precedente del browser
  location = inject(Location)

  onClickIndietro() {
    this.location.back()
  }
}
