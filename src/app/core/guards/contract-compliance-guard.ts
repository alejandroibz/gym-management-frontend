import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanActivateChildFn, Router } from '@angular/router';
import { catchError, map, of, switchMap, take } from 'rxjs';
import { RoleService } from '../auth/role';
import { environment } from '../../../environments/environment';

export const contractComplianceGuard: CanActivateChildFn = (_route, state) => {
  const roles = inject(RoleService);
  const http = inject(HttpClient);
  const router = inject(Router);

  return roles.roles$.pipe(
    take(1),
    switchMap(userRoles => {
      if (!userRoles.includes('User') || state.url === '/sin-acceso') return of(true);

      return http.get<Array<{ id: number; status: string }>>(`${environment.apiUrl}/api/contracts/mine`).pipe(
        map(items => {
          const pending = items.find(item => item.status === 'PendingSignature');
          if (items.length === 0) return router.createUrlTree(['/sin-acceso']);
          if (!pending) return true;
          if (state.url === `/contracts/${pending.id}/sign`) return true;
          return router.createUrlTree(['/contracts', pending.id, 'sign']);
        }),
        catchError(() => of(router.createUrlTree(['/sin-acceso'])))
      );
    })
  );
};
