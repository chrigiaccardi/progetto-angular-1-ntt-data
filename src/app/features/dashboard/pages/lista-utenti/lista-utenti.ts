import { Component, inject } from '@angular/core';
import { UtentiStore } from '../../../../core/store/utenti-store';
import { CardDashboard } from '../../../../shared/directives/card-dashboard';
import { BtnIndietro } from '../../../../shared/components/btn-indietro/btn-indietro';
import { MatInputModule } from "@angular/material/input";
import { ItemListaUtenti } from "./components/item-lista-utenti/item-lista-utenti";

@Component({
  selector: 'app-lista-utenti',
  imports: [CardDashboard, BtnIndietro, MatInputModule, ItemListaUtenti],
  templateUrl: './lista-utenti.html',
  styleUrl: './lista-utenti.css',
})
export class ListaUtenti {
  utentiStore = inject(UtentiStore)
}
