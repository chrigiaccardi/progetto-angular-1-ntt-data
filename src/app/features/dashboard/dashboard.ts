import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BtnSidenav } from '../../core/services/btnSidenav/btn-sidenav';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router'
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-dashboard',
  imports: [MatSidenavModule, RouterOutlet, MatButtonModule, RouterLinkWithHref, MatDividerModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export default class Dashboard {
  // Iniettiamo il service sidenav per apertura e chiusura
  sidenav = inject(BtnSidenav)

}
