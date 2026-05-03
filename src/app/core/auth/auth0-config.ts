import { environment } from '../../../environments/environment';

export const auth0Config = {
  audience: environment.auth0.audience,
  rolesClaim: environment.auth0.rolesClaim
} as const;

export function extractUserRoles(user: Record<string, unknown> | null | undefined): string[] {
  const rawRoles = user?.[auth0Config.rolesClaim];

  if (Array.isArray(rawRoles)) {
    return rawRoles.filter((role): role is string => typeof role === 'string');
  }

  if (typeof rawRoles === 'string' && rawRoles.trim().length > 0) {
    return [rawRoles];
  }

  return [];
}
