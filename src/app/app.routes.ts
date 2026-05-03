import { Routes } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';

import { AppShell } from './core/layout/app-shell/app-shell';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login')
        .then(m => m.LoginComponent)
  },
  {
    path: '',
    component: AppShell,
    canActivate: [authGuardFn],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard-page/dashboard-page')
            .then(m => m.DashboardPageComponent)
      },
      {
        path: 'employees',
        loadComponent: () =>
          import('./features/employees/pages/employees-page/employees-page')
            .then(m => m.EmployeesPageComponent),
        canActivate: [roleGuard],
        data: {
          roles: ['SuperAdmin']
        }
      },
      {
        path: 'employees/categories',
        loadComponent: () =>
          import('./features/employee-categories/pages/employee-categories-page/employee-categories-page')
            .then(m => m.EmployeeCategoriesPageComponent),
        canActivate: [roleGuard],
        data: {
          roles: ['SuperAdmin']
        }
      },
      {
        path: 'employees/:id',
        loadComponent: () =>
          import('./features/employees/pages/employee-details-page/employee-details-page')
            .then(m => m.EmployeeDetailsPageComponent),
        canActivate: [roleGuard],
        data: {
          roles: ['SuperAdmin']
        }
      },
      {
        path: 'clients',
        loadComponent: () =>
          import('./features/clients/pages/clients-page/clients-page')
            .then(m => m.ClientsPageComponent)
      },
      {
        path: 'clients/:id',
        loadComponent: () =>
          import('./features/clients/pages/client-details-page/client-details-page')
            .then(m => m.ClientDetailsPageComponent)
      },
      {
        path: 'membership-plans',
        loadComponent: () =>
          import('./features/membership-plans/pages/membership-plans-page/membership-plans-page')
            .then(m => m.MembershipPlansPageComponent)
      },
      {
        path: 'movements',
        loadComponent: () =>
          import('./features/movements/pages/movements-page/movements-page')
            .then(m => m.MovementsPageComponent)
      },
      {
        path: 'movements/categories',
        loadComponent: () =>
          import('./features/cash-movement-categories/pages/cash-movement-categories-page/cash-movement-categories-page')
            .then(m => m.CashMovementCategoriesPageComponent)
      }
    ]
  }
];