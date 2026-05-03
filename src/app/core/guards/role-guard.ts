import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { combineLatest, map } from 'rxjs';
import { extractUserRoles } from '../auth/auth0-config';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const allowedRoles = (route.data['roles'] as string[] | undefined) ?? [];

  return combineLatest([
    auth.isAuthenticated$,
    auth.user$
  ]).pipe(
    map(([isAuthenticated, user]) => {
      if (!isAuthenticated) {
        return router.createUrlTree(['/login']);
      }

      if (allowedRoles.length === 0) {
        return true;
      }

      const userRoles = extractUserRoles(user);

      const hasAccess = userRoles.some(role => allowedRoles.includes(role));

      if (!hasAccess) {
        return router.createUrlTree(['/dashboard']);
      }

      return true;
    })
  );
};
