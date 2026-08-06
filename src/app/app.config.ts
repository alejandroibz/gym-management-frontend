import { ApplicationConfig, ErrorHandler, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { SpanishPaginatorIntl } from './core/services/spanish-paginator-intl';
import { apiNotificationInterceptor } from './core/http/api-notification.interceptor';
import { GlobalErrorHandler } from './core/errors/global-error-handler';

const redirectUri = environment.auth0.redirectUri || `${window.location.origin}/`;

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideHttpClient(
      withInterceptors([authHttpInterceptorFn, apiNotificationInterceptor])
    ),

    provideRouter(routes),

    importProvidersFrom(MatSnackBarModule),

    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },

    {
      provide: MatPaginatorIntl,
      useClass: SpanishPaginatorIntl
    },

    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { disableClose: true }
    },

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
