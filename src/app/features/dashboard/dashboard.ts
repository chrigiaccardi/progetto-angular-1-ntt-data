import { Component, Inject, inject } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BtnSidenav } from '../../core/services/btnSidenav/btn-sidenav';
import { RouterOutlet } from '@angular/router'


@Component({
  selector: 'app-dashboard',
  imports: [MatSidenavModule, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  // Iniettiamo il service sidenav per apertura e chiusura
  sidenav = inject(BtnSidenav)

}
