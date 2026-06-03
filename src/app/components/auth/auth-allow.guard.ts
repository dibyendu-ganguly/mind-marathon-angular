import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const authAllowGuard: CanActivateFn = (route, state) => {
  console.log('AuthAllowGuard executed',route,state);
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticated()) {
    return false;
  }
  return true;
  // return router.parseUrl('/login');
};
