import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { LoginComponent } from './login';
import { RoleService } from '../../../core/auth/role';
import { environment } from '../../../../environments/environment';

describe('LoginComponent', () => {
  const navigate = vi.fn();
  const loginWithRedirect = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: { isLoading$: of(false), isAuthenticated$: of(false), loginWithRedirect } },
        { provide: Router, useValue: { navigate } },
        { provide: RoleService, useValue: { roles$: of(['Admin']) } }
      ]
    });
  });
  it('starts login with the configured callback and clients destination', () => {
    TestBed.createComponent(LoginComponent).componentInstance.login();
    expect(loginWithRedirect).toHaveBeenCalledWith({
      authorizationParams: { redirect_uri: environment.auth0.redirectUri },
      appState: { target: '/clients' }
    });
    expect(navigate).not.toHaveBeenCalled();
  });
  it('sends an authenticated administrator to clients', () => {
    TestBed.overrideProvider(AuthService, { useValue: { isLoading$: of(false), isAuthenticated$: of(true) } });
    TestBed.createComponent(LoginComponent);
    expect(navigate).toHaveBeenCalledWith(['/clients']);
  });
});
