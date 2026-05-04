import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth-service/auth-service';
import { BtnSidenav } from '../../core/services/btnSidenav/btn-sidenav';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  // Iniettiamo authService per poterlo utilizzare
  authService = inject(AuthService)

  // Iniettiamo il service del Bottone sidenav
  sidenav = inject(BtnSidenav)
}
