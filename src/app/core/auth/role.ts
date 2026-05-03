import { Injectable, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { map, Observable } from 'rxjs';
import { extractUserRoles } from './auth0-config';

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
      map(roles => roles.includes(role))
    );
  }

  hasAnyRole(allowedRoles: string[]): Observable<boolean> {
    return this.roles$.pipe(
      map(roles => roles.some(role => allowedRoles.includes(role)))
    );
  }
}
