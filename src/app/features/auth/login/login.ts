import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { filter } from 'rxjs';

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

  isLoading$ = this.auth.isLoading$;
  isAuthenticated$ = this.auth.isAuthenticated$;

  constructor() {
    this.isAuthenticated$
      .pipe(
        filter(Boolean),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        void this.router.navigate(['/dashboard']);
      });
  }

  login(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/dashboard'
      }
    });
  }

  logout(): void {
    const appBasePath = '/gym-management-frontend/';

    const returnTo = window.location.hostname.includes('github.io')
      ? `${window.location.origin}${appBasePath}`
      : window.location.origin;

    this.auth.logout({
      logoutParams: {
        returnTo
      }
    });
  }
}
