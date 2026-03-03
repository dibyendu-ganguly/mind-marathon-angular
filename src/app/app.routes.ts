import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'quiz', loadChildren: () => import('../app/components/quiz/quiz.routes') },
  { path: 'test', loadComponent: () => import('../app/components/layout/test-placeholder/test-placeholder.component').then((m) => m.TestPlaceholderComponent) },
];
