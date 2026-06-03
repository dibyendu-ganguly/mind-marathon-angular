import { Routes } from '@angular/router';
import { authAllowGuard } from './auth-allow.guard';

const quizRoutes: Routes = [
  // { path: '', redirectTo:'create'},
  {
    path: '',
    loadComponent: () => import('./auth.component').then((m) => m.AuthComponent),
    canActivate: [authAllowGuard],
    // children:[
    //   { path: '', redirectTo: 'auth', pathMatch: 'full' }
    // ]
  },
];

export default quizRoutes;
