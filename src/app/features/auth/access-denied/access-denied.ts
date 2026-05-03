import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RoleService } from '../../../core/auth/role';

@Component({
  selector: 'app-access-denied',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './access-denied.html',
  styleUrl: './access-denied.scss'
})
export class AccessDeniedComponent {
  private readonly auth = inject(AuthService);
  private readonly roleService = inject(RoleService);

  isAdminOrSuperAdmin$ = this.roleService.hasAnyRole(['SuperAdmin', 'Admin']);

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
