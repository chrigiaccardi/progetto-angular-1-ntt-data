import { Component, inject, input } from '@angular/core';
import { UtentiStore } from '../../../../core/store/utenti-store';
import { Utente } from '../../../../core/models/utente';
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CardDashboard } from "../../../../shared/directives/card-dashboard";
import { BtnIndietro } from "../../../../shared/components/btn-indietro/btn-indietro";
import { PipeStatoPipe } from "../../../../shared/pipes/pipe-stato-pipe";

@Component({
  selector: 'app-dettagli-utente',
  imports: [MatIconModule, MatProgressSpinnerModule, CardDashboard, BtnIndietro, PipeStatoPipe],
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
