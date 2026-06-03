import { Routes } from '@angular/router';

export const routes: Routes = [
  // { path: '', redirectTo: 'quiz', pathMatch: 'full' },
  { path: '', loadComponent: () => import('../app/components/home/home.component').then((m) => m.HomeComponent), pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('../app/components/auth/auth.routes') },
  { path: 'quiz', loadChildren: () => import('../app/components/quiz/quiz.routes') },
  { path: 'events', loadComponent: () => import('../app/components/created-event-list/created-event-list.component').then((m) => m.CreatedEventListComponent) },
  { path: 'test', loadComponent: () => import('../app/components/layout/test-placeholder/test-placeholder.component').then((m) => m.TestPlaceholderComponent) },
];
