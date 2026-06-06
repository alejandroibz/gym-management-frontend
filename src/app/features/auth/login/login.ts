import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { filter, switchMap, take } from 'rxjs';
import { hasAnyAllowedRole } from '../../../core/auth/auth0-config';
import { RoleService } from '../../../core/auth/role';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly roleService = inject(RoleService);

  isLoading$ = this.auth.isLoading$;
  isAuthenticated$ = this.auth.isAuthenticated$;

  constructor() {
    this.isAuthenticated$
      .pipe(
        filter(Boolean),
        switchMap(() => this.roleService.roles$.pipe(take(1))),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(roles => {
        const target = hasAnyAllowedRole(roles, ['SuperAdmin']) ? '/dashboard' : '/clients';
        void this.router.navigate([target]);
      });
  }

  login(): void {
    this.auth.loginWithRedirect({
      authorizationParams: {
        redirect_uri: environment.auth0.redirectUri || window.location.origin
      },
      appState: {
        target: '/clients'
      }
    });
  }

  logout(): void {
    const returnTo = environment.auth0.logoutReturnTo || window.location.origin;

    this.auth.logout({
      logoutParams: {
        returnTo
      }
    });
  }
}
