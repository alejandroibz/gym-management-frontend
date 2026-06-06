import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RoleService } from '../../../core/auth/role';
import { environment } from '../../../../environments/environment';

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

  isSuperAdmin$ = this.roleService.hasRole('SuperAdmin');
  isAdmin$ = this.roleService.hasRole('Admin');

  logout(): void {
    const returnTo = environment.auth0.logoutReturnTo || window.location.origin;

    this.auth.logout({
      logoutParams: {
        returnTo
      }
    });
  }
}
