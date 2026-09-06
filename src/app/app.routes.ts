import { Routes } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';

import { AppShell } from './core/layout/app-shell/app-shell';
import { roleGuard } from './core/guards/role-guard';
import { contractComplianceGuard } from './core/guards/contract-compliance-guard';

export const routes: Routes = [
  {
    path: 'body-map-calibrator',
    loadComponent: () =>
      import('./features/student-platform/pages/body-map-calibrator-page/body-map-calibrator-page')
        .then(m => m.BodyMapCalibratorPageComponent)
  },
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
    canActivateChild: [contractComplianceGuard],
    children: [
      {
        path: 'preregistrations',
        loadComponent: () => import('./features/preregistrations/preregistrations-page').then(m => m.PreregistrationsPageComponent),
        canActivate: [roleGuard],
        data: { roles: ['SuperAdmin', 'Admin'] }
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'sin-acceso',
        loadComponent: () =>
          import('./features/auth/access-denied/access-denied')
            .then(m => m.AccessDeniedComponent)
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard-page/dashboard-page')
            .then(m => m.DashboardPageComponent),
        canActivate: [roleGuard],
        data: {
          roles: ['SuperAdmin']
        }
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/pages/profile-page/profile-page')
            .then(m => m.ProfilePageComponent)
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
            .then(m => m.ClientsPageComponent),
        canActivate: [roleGuard],
        data: {
          roles: ['SuperAdmin', 'Admin']
        }
      },
      {
        path: 'clients/new',
        loadComponent: () =>
          import('./features/clients/pages/client-details-page/client-details-page')
            .then(m => m.ClientDetailsPageComponent),
        canActivate: [roleGuard],
        data: { roles: ['SuperAdmin', 'Admin'] }
      },
      {
        path: 'clients/:id',
        loadComponent: () =>
          import('./features/clients/pages/client-details-page/client-details-page')
            .then(m => m.ClientDetailsPageComponent),
        canActivate: [roleGuard],
        data: {
          roles: ['SuperAdmin', 'Admin']
        }
      },
      {
        path: 'my-contracts',
        loadComponent: () => import('./features/contracts/pages/my-contracts-page/my-contracts-page').then(m => m.MyContractsPageComponent),
        canActivate: [roleGuard], data: { roles: ['User'] }
      },
      {
        path: 'contracts',
        loadComponent: () => import('./features/contracts/pages/contracts-page/contracts-page').then(m => m.ContractsPageComponent),
        canActivate: [roleGuard], data: { roles: ['SuperAdmin'] }
      },
      {
        path: 'contracts/:id/sign',
        loadComponent: () => import('./features/contracts/pages/contract-signature-page/contract-signature-page').then(m => m.ContractSignaturePageComponent),
        canActivate: [roleGuard], data: { roles: ['SuperAdmin', 'Admin', 'User'] }
      },
      {
        path: 'contracts/:id',
        loadComponent: () => import('./features/contracts/pages/contract-detail-page/contract-detail-page').then(m => m.ContractDetailPageComponent),
        canActivate: [roleGuard], data: { roles: ['SuperAdmin', 'Admin'] }
      },
      {
        path: 'health/patients/:id',
        loadComponent: () =>
          import('./features/health/pages/health-patient-detail-page/health-patient-detail-page')
            .then(m => m.HealthPatientDetailPageComponent),
        canActivate: [roleGuard],
        data: {
          roles: ['SuperAdmin']
        }
      },
      {
        path: 'health',
        loadComponent: () =>
          import('./features/health/pages/health-page/health-page')
            .then(m => m.HealthPageComponent),
        canActivate: [roleGuard],
        data: {
          roles: ['SuperAdmin', 'Admin']
        }
      },
      {
        path: 'membership-plans',
        loadComponent: () =>
          import('./features/membership-plans/pages/membership-plans-page/membership-plans-page')
            .then(m => m.MembershipPlansPageComponent),
        canActivate: [roleGuard],
        data: {
          roles: ['SuperAdmin', 'Admin']
        }
      },
      {
        path: 'movements',
        loadComponent: () =>
          import('./features/movements/pages/movements-page/movements-page')
            .then(m => m.MovementsPageComponent),
        canActivate: [roleGuard],
        data: {
          roles: ['SuperAdmin']
        }
      },
      {
        path: 'movements/payments/new',
        loadComponent: () =>
          import('./features/payments/pages/payment-register-page/payment-register-page')
            .then(m => m.PaymentRegisterPageComponent),
        canActivate: [roleGuard],
        data: {
          roles: ['SuperAdmin']
        }
      },
      {
        path: 'movements/categories',
        loadComponent: () =>
          import('./features/cash-movement-categories/pages/cash-movement-categories-page/cash-movement-categories-page')
            .then(m => m.CashMovementCategoriesPageComponent),
        canActivate: [roleGuard],
        data: {
          roles: ['SuperAdmin']
        }
      },
      {
        path: 'student-platform/routines/new',
        loadComponent: () =>
          import('./features/student-platform/pages/routine-create-page/routine-create-page')
            .then(m => m.RoutineCreatePageComponent),
        canActivate: [roleGuard],
        data: {
          roles: ['SuperAdmin']
        }
      },
      {
        path: 'weekly-schedules',
        loadComponent: () =>
          import('./features/weekly-schedules/pages/weekly-schedules-page/weekly-schedules-page')
            .then(m => m.WeeklySchedulesPageComponent),
        canActivate: [roleGuard],
        data: { roles: ['SuperAdmin', 'Admin'] }
      },
      {
        path: 'student-platform/routines/:id',
        loadComponent: () =>
          import('./features/student-platform/pages/workout-detail-page/workout-detail-page')
            .then(m => m.WorkoutDetailPageComponent),
        canActivate: [roleGuard],
        data: {
          roles: ['SuperAdmin']
        }
      },
      {
        path: 'student-platform/training-plans/new',
        loadComponent: () =>
          import('./features/student-platform/pages/training-plan-create-page/training-plan-create-page')
            .then(m => m.TrainingPlanCreatePageComponent),
        canActivate: [roleGuard],
        data: {
          roles: ['SuperAdmin']
        }
      },
      {
        path: 'student-platform/training-plans/:id',
        loadComponent: () =>
          import('./features/student-platform/pages/training-plan-detail-page/training-plan-detail-page')
            .then(m => m.TrainingPlanDetailPageComponent),
        canActivate: [roleGuard],
        data: {
          roles: ['SuperAdmin']
        }
      },
      {
        path: 'student-platform/exercises/new',
        loadComponent: () =>
          import('./features/student-platform/pages/exercise-create-page/exercise-create-page')
            .then(m => m.ExerciseCreatePageComponent),
        canActivate: [roleGuard],
        data: {
          roles: ['SuperAdmin']
        }
      },
      {
        path: 'student-platform/exercises/:id',
        loadComponent: () =>
          import('./features/student-platform/pages/exercise-create-page/exercise-create-page')
            .then(m => m.ExerciseCreatePageComponent),
        canActivate: [roleGuard],
        data: {
          roles: ['SuperAdmin']
        }
      },
      {
        path: 'student-platform',
        loadComponent: () =>
          import('./features/student-platform/pages/student-platform-page/student-platform-page')
            .then(m => m.StudentPlatformPageComponent),
        canActivate: [roleGuard],
        data: {
          roles: ['SuperAdmin']
        }
      }
    ]
  }
];
