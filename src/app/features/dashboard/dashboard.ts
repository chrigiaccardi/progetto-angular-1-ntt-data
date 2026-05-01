import { Component, Inject, inject } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { PannelloDashboard } from "./components/pannello-dashboard/pannello-dashboard";
import { UtentiStore } from '../../core/store/utenti-store';


@Component({
  selector: 'app-dashboard',
  imports: [MatSidenavModule, PannelloDashboard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  // Iniettiamo UtentiStore per poterlo utilizzare
  utentiStore = inject(UtentiStore)


}
