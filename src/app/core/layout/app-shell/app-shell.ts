import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RoleService } from '../../auth/role';
import { environment } from '../../../../environments/environment';
import { UserProfile } from '../../../features/profile/models/profile.model';
import { ProfileService } from '../../../features/profile/services/profile.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.scss'
})
export class AppShell {
  private readonly router = inject(Router);
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly roleService = inject(RoleService);
  private readonly auth = inject(AuthService);
  private readonly profileService = inject(ProfileService);


  isSuperAdmin$ = this.roleService.hasRole('SuperAdmin');
  isAdminOrSuperAdmin$ = this.roleService.hasAnyRole(['SuperAdmin', 'Admin']);
  user$ = this.auth.user$;
  readonly currentProfile = signal<UserProfile | null>(null);
  isCollapsed = true;
  isMobile = false;
  isMobileSidebarOpen = false;
  employeesMenuOpen = false;
  clientsMenuOpen = false;
  movementsMenuOpen = false;
  isDarkTheme = false;

  constructor() {
    this.initTheme();

    this.breakpointObserver.observe('(max-width: 1024px)').subscribe(({ matches }) => {
      this.isMobile = matches;

      if (matches) {
        this.isCollapsed = false;
        this.isMobileSidebarOpen = false;
        this.syncLayout();
        return;
      }

      this.isCollapsed = true;
      this.isMobileSidebarOpen = false;
      this.syncLayout();
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadCurrentProfile();
        this.syncLayout();
      }
    });

    this.loadCurrentProfile();
  }

  get isEmployeesSectionActive(): boolean {
    return this.router.url.startsWith('/employees');
  }

  get isClientsSectionActive(): boolean {
    return this.router.url.startsWith('/clients') || this.router.url.startsWith('/membership-plans');
  }

  get isHealthSectionActive(): boolean {
    return this.router.url.startsWith('/health');
  }

  get isMovementsSectionActive(): boolean {
    return this.router.url.startsWith('/movements');
  }

  toggleSidebar(): void {
    if (this.isMobile) {
      this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
      this.syncLayout();
      return;
    }

    this.isCollapsed = !this.isCollapsed;
    this.syncLayout();
  }

  toggleEmployeesMenu(): void {
    if (this.isCollapsed) {
      this.isCollapsed = false;
    }

    this.employeesMenuOpen = !this.employeesMenuOpen;
  }

  toggleClientsMenu(): void {
    if (this.isCollapsed) {
      this.isCollapsed = false;
    }

    this.clientsMenuOpen = !this.clientsMenuOpen;
  }

  toggleMovementsMenu(): void {
    if (this.isCollapsed) {
      this.isCollapsed = false;
    }

    this.movementsMenuOpen = !this.movementsMenuOpen;
  }

  closeSidebarOnMobile(): void {
    if (this.isMobile) {
      this.isMobileSidebarOpen = false;
      this.syncLayout();
    }
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme();
  }

  logout(): void {
    const returnTo = environment.auth0.logoutReturnTo || window.location.origin;

    this.auth.logout({
      logoutParams: {
        returnTo
      }
    });
  }

  getUserDisplayName(user: Record<string, unknown> | null | undefined): string {
    const profile = this.currentProfile();
    const profileName = `${profile?.nombre ?? ''} ${profile?.apellido ?? ''}`.trim();
    if (profileName) {
      return profileName;
    }

    const name = user?.['name'];
    const nickname = user?.['nickname'];
    const email = user?.['email'];

    if (typeof name === 'string' && name.trim()) {
      return name;
    }

    if (typeof nickname === 'string' && nickname.trim()) {
      return nickname;
    }

    if (typeof email === 'string' && email.trim()) {
      return email;
    }

    return 'usuario';
  }

  getUserInitials(user: Record<string, unknown> | null | undefined): string {
    const profile = this.currentProfile();
    const displayName = `${profile?.nombre ?? ''} ${profile?.apellido ?? ''}`.trim() || this.getUserDisplayName(user);
    const parts = displayName
      .split(/[\s@._-]+/)
      .map(part => part.trim())
      .filter(Boolean);

    const initials = parts.slice(0, 2).map(part => part[0]?.toUpperCase()).join('');
    return initials || 'U';
  }

  getUserPicture(user: Record<string, unknown> | null | undefined): string | null {
    const profileAvatar = this.currentProfile()?.avatarUrl;
    if (profileAvatar?.trim()) {
      return profileAvatar;
    }

    const picture = user?.['picture'];
    return typeof picture === 'string' && picture.trim() ? picture : null;
  }

  private loadCurrentProfile(): void {
    this.profileService.getMe().subscribe({
      next: profile => this.currentProfile.set(profile),
      error: () => this.currentProfile.set(null)
    });
  }

  private syncLayout(): void {
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'));
    });
  }

  private initTheme(): void {
    const savedTheme = localStorage.getItem('gym-theme');
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    this.isDarkTheme = savedTheme ? savedTheme === 'dark' : prefersDark;
    this.applyTheme();
  }

  private applyTheme(): void {
    document.body.classList.toggle('dark-theme', this.isDarkTheme);
    localStorage.setItem('gym-theme', this.isDarkTheme ? 'dark' : 'light');
  }
}
