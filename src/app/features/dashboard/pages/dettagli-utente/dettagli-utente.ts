import { Component, inject, input } from '@angular/core';
import { UtentiStore } from '../../../../core/store/utenti-store';
import { Utente } from '../../../../core/models/utente';
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CardDashboard } from "../../../../shared/directives/card-dashboard";

@Component({
  selector: 'app-dettagli-utente',
  imports: [MatIconModule, MatProgressSpinnerModule, CardDashboard],
  templateUrl: './dettagli-utente.html',
  styleUrl: './dettagli-utente.css',
})
export default class DettagliUtente {
  // Iniettiamo lo store per poterlo utilizzare
  utentiStore = inject(UtentiStore)

  // idUtente in input con il binding impostato nel config inserisce direttamente nella route l'id dell'utente
  idUtente = input.required<string>();

  constructor() {
    this.utentiStore.setIdUtente(this.idUtente)
  }
}
