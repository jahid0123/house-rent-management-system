import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const isLoggedIn = authService.isLoggedIn;
  const userRole = authService.getUserRole()?.toLowerCase() ?? '';

  const allowedRoles = route.data?.['roles'] as string[] | undefined;

  if (!isLoggedIn) {
    router.navigateByUrl('/login');
    return false;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};
