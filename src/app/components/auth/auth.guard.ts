import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  console.log('AuthGuard executed',route,state);
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticated()) {
    return true;
  }
  authService.loginSuccessRedirectUri = "/quiz/create";
  return router.parseUrl('/auth');
};