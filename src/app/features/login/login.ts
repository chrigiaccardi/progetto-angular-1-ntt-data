import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service/auth-service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  // Iniettiamo AuthService
  authService = inject(AuthService)

  // Prendiamo il valore dall'input e lo mandiamo in ingresso per la verifica
  invioToken(form: NgForm) {
    const token = form.value.token
    this.authService.verificaBearerToken(token)
    console.log('Token Inviato', token)
  }
}
