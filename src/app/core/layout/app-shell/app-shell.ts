import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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

  isCollapsed = true;
  isMobile = false;
  isMobileSidebarOpen = false;
  employeesMenuOpen = false;
  clientsMenuOpen = false;
  movementsMenuOpen = false;

  constructor() {
    this.breakpointObserver.observe('(max-width: 767px)').subscribe(({ matches }) => {
      this.isMobile = matches;

      if (matches) {
        this.isCollapsed = false;
        this.isMobileSidebarOpen = false;
        return;
      }

      this.isCollapsed = true;
      this.isMobileSidebarOpen = false;
    });
  }

  get isEmployeesSectionActive(): boolean {
    return this.router.url.startsWith('/employees');
  }

  get isClientsSectionActive(): boolean {
    return this.router.url.startsWith('/clients') || this.router.url.startsWith('/membership-plans');
  }

  get isMovementsSectionActive(): boolean {
    return this.router.url.startsWith('/movements');
  }

  toggleSidebar(): void {
    if (this.isMobile) {
      this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
      return;
    }

    this.isCollapsed = !this.isCollapsed;
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
    }
  }
}
