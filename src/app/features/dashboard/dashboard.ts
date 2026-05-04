import { Component, Inject, inject } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { PannelloDashboard } from "./components/pannello-dashboard/pannello-dashboard";
import { UtentiStore } from '../../core/store/utenti-store';
import { CardDashboard } from "../../shared/directives/card-dashboard";


@Component({
  selector: 'app-dashboard',
  imports: [MatSidenavModule, PannelloDashboard, CardDashboard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  // Iniettiamo UtentiStore per poterlo utilizzare
  utentiStore = inject(UtentiStore)


}
