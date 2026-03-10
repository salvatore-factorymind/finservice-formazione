import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { ProjectService } from './shared/service/project.service';
import { UnionService } from './shared/service/union.service';
import { UserService } from './shared/service/user.service';
import { FunctionsService } from './shared/service/functions/functions.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    ProjectService,
    UnionService,
    UserService,
    FunctionsService,
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json'
      }),
      lang: 'it',
      fallbackLang: 'en',
    }),
  ]
};
