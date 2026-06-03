import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { InMemoryScrollingFeature, InMemoryScrollingOptions, provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { StorageService } from './services/storage.service';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environments/environment';
import { AppEnvConfig } from '../environments/environment.model';
import { routes } from './app.routes';
import { AuthService } from './services/auth.service';
import { AUTH_CONSTANTS } from './constants/auth.constants';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);

const loadServerConfig = (): Promise<AppEnvConfig['config']> => {
  return fetch('/assets/config.json')
    .then(response => response.json())
};

const checkAuthentication = (storageService:StorageService,authService:AuthService): Promise<void> => {
  
  return new Promise((resolve) => {
    // Simulate an async authentication check (e.g., checking token validity)
    const user = storageService.getItem(AUTH_CONSTANTS.userStorageKey);
    if(user){
      authService.setUser(JSON.parse(user));
    }
    resolve(); // Resolve regardless of auth status for now
  });
};

const initializeApp = () => {
  const storageService = inject(StorageService);
  const authService = inject(AuthService);
  return new Promise<void>(async (resolve) => {
    try {
      const config = await loadServerConfig();
      console.log('Server config loaded:', config);
      environment.config = { ...config } as AppEnvConfig['config'];
      await checkAuthentication(storageService, authService);
      resolve();
    } catch (error) {
      console.error('Failed to load server config:', error);
      resolve();
    }
  });
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(initializeApp),
    provideZoneChangeDetection({ eventCoalescing: true }),
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    provideRouter(routes, withHashLocation(), inMemoryScrollingFeature),
    provideHttpClient(),
    provideAnimationsAsync(),
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}, provideClientHydration()
  ]
};
