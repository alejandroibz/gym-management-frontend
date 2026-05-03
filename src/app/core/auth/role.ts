import { Injectable, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { map, Observable } from 'rxjs';
import { extractUserRoles, hasAnyAllowedRole } from './auth0-config';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly auth = inject(AuthService);

  roles$: Observable<string[]> = this.auth.user$.pipe(
    map(user => extractUserRoles(user))
  );

  hasRole(role: string): Observable<boolean> {
    return this.roles$.pipe(
      map(roles => hasAnyAllowedRole(roles, [role]))
    );
  }

  hasAnyRole(allowedRoles: string[]): Observable<boolean> {
    return this.roles$.pipe(
      map(roles => hasAnyAllowedRole(roles, allowedRoles))
    );
  }
}
