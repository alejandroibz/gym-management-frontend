import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { SpanishPaginatorIntl } from './core/services/spanish-paginator-intl';

const redirectUri = window.location.origin;

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authHttpInterceptorFn])),
    provideRouter(routes),
    { provide: MatPaginatorIntl, useClass: SpanishPaginatorIntl },
    provideAuth0({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: redirectUri,
        audience: environment.auth0.audience
      },
      httpInterceptor: {
        allowedList: [
          {
            uri: `${environment.apiUrl}/api/*`,
            tokenOptions: {
              authorizationParams: {
                audience: environment.auth0.audience
              }
            }
          }
        ]
      }
    })
  ]
};
