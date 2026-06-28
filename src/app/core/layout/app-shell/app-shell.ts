import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subject, catchError, debounceTime, distinctUntilChanged, forkJoin, map, of, startWith, switchMap } from 'rxjs';
import { RoleService } from '../../auth/role';
import { environment } from '../../../../environments/environment';
import { UserProfile } from '../../../features/profile/models/profile.model';
import { ProfileService } from '../../../features/profile/services/profile.service';
import { ClientsService } from '../../../features/clients/services/clients.service';
import { StudentPlatformService } from '../../../features/student-platform/services/student-platform.service';

interface GlobalCommandItem {
  icon: string;
  label: string;
  description: string;
  route: string;
  group: 'Acciones' | 'Alumnos' | 'Ejercicios' | 'Workouts' | 'Planes';
}

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
  private readonly clientsService = inject(ClientsService);
  private readonly platformService = inject(StudentPlatformService);
  private readonly commandQueryChanges = new Subject<string>();


  isSuperAdmin$ = this.roleService.hasRole('SuperAdmin');
  isAdminOrSuperAdmin$ = this.roleService.hasAnyRole(['SuperAdmin', 'Admin']);
  user$ = this.auth.user$;
  readonly currentProfile = signal<UserProfile | null>(null);
  readonly commandQuery = new FormControl('', { nonNullable: true });
  readonly commandOpen = signal(false);
  readonly commandSearching = signal(false);
  readonly commandResults = signal<GlobalCommandItem[]>([]);
  readonly quickCommands: GlobalCommandItem[] = [
    { icon: 'person_add', label: 'Nuevo alumno', description: 'Abrir alta de alumnos', route: '/clients/new', group: 'Acciones' },
    { icon: 'payments', label: 'Registrar pago', description: 'Cargar un nuevo cobro', route: '/movements/payments/new', group: 'Acciones' },
    { icon: 'add_circle', label: 'Nuevo ejercicio', description: 'Crear ejercicio del gimnasio', route: '/student-platform/exercises/new', group: 'Acciones' },
    { icon: 'fitness_center', label: 'Nuevo workout', description: 'Armar una rutina reutilizable', route: '/student-platform/routines/new', group: 'Acciones' },
    { icon: 'assignment_add', label: 'Nuevo plan', description: 'Crear un plan de entrenamiento', route: '/student-platform/training-plans/new', group: 'Acciones' },
    { icon: 'description', label: 'Contratos pendientes', description: 'Revisar seguimiento contractual', route: '/contracts', group: 'Acciones' }
  ];
  isCollapsed = true;
  isMobile = false;
  isMobileSidebarOpen = false;
  employeesMenuOpen = false;
  clientsMenuOpen = false;
  movementsMenuOpen = false;
  isDarkTheme = false;

  constructor() {
    this.initTheme();
    this.initCommandSearch();

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

  @HostListener('document:keydown', ['$event'])
  handleGlobalShortcut(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.openCommandPalette();
    } else if (event.key === 'Escape' && this.commandOpen()) {
      this.closeCommandPalette();
    }
  }

  openCommandPalette(): void {
    this.commandOpen.set(true);
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => document.querySelector<HTMLInputElement>('.global-command-input')?.focus());
  }

  closeCommandPalette(): void {
    this.commandOpen.set(false);
    this.commandQuery.setValue('');
    this.commandResults.set([]);
    document.body.style.overflow = '';
  }

  runCommand(item: GlobalCommandItem): void {
    this.closeCommandPalette();
    void this.router.navigateByUrl(item.route);
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

  private initCommandSearch(): void {
    this.commandQuery.valueChanges.subscribe(value => this.commandQueryChanges.next(value));
    this.commandQueryChanges.pipe(
      startWith(''), map(value => value.trim()), debounceTime(220), distinctUntilChanged(),
      switchMap(term => {
        if (term.length < 2) {
          this.commandSearching.set(false);
          return of([] as GlobalCommandItem[]);
        }

        this.commandSearching.set(true);
        const normalized = term.toLocaleLowerCase('es');
        return forkJoin({
          clients: this.clientsService.getPaged(1, 6, { search: term }).pipe(catchError(() => of({ items: [], pageNumber: 1, pageSize: 6, totalCount: 0, totalPages: 0 }))),
          exercises: this.platformService.getExercises(term).pipe(catchError(() => of([]))),
          routines: this.platformService.getRoutineTemplates().pipe(catchError(() => of([]))),
          plans: this.platformService.getTrainingPlans().pipe(catchError(() => of([])))
        }).pipe(map(data => [
          ...data.clients.items.slice(0, 6).map(item => ({ icon: 'person', label: `${item.nombre} ${item.apellido}`, description: `DNI ${item.dni}`, route: `/clients/${item.id}`, group: 'Alumnos' as const })),
          ...data.exercises.slice(0, 5).map(item => ({ icon: 'exercise', label: item.name, description: item.muscleGroup || 'Ejercicio', route: `/student-platform/exercises/${item.id}`, group: 'Ejercicios' as const })),
          ...data.routines.filter(item => `${item.name} ${item.description ?? ''}`.toLocaleLowerCase('es').includes(normalized)).slice(0, 5).map(item => ({ icon: 'fitness_center', label: item.name, description: `${item.exercises.length} ejercicios`, route: `/student-platform/routines/${item.id}`, group: 'Workouts' as const })),
          ...data.plans.filter(item => `${item.name} ${item.description ?? ''}`.toLocaleLowerCase('es').includes(normalized)).slice(0, 5).map(item => ({ icon: 'assignment', label: item.name, description: `${item.workoutCount} workouts`, route: `/student-platform/training-plans/${item.id}`, group: 'Planes' as const }))
        ]));
      })
    ).subscribe(items => {
      this.commandResults.set(items);
      this.commandSearching.set(false);
    });
  }
}
