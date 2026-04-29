import { inject } from '@angular/core';
import { AuthService } from '../auth-service/auth-service';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
  // Iniettiamo AuthService e Router per poterli utilizzare
  const tokenAuthService = inject(AuthService);
  const router = inject(Router);
  
    if (tokenAuthService.userLoggato()) {
      return true
    } else {
      router.navigate(['/login'])
      return false
    }
}
