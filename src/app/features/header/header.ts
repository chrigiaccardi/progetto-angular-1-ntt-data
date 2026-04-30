import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth-service/auth-service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  // Iniettiamo authService per poterlo utilizzare
  authService = inject(AuthService)
}
