import { Routes } from '@angular/router';

const quizRoutes: Routes = [
  // { path: '', redirectTo:'create'},
  {
    path: '',
    loadComponent: () => import('./quiz.component').then((m) => m.QuizComponent),
    children:[
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('./quiz-home/quiz-home.component').then((m) => m.QuizHomeComponent) },
      { path: 'create', loadComponent: () => import('./create-quiz/create-quiz.component').then((m) => m.CreateQuizComponent) },
      { path: 'view', loadComponent: () => import('./view-quiz/view-quiz.component').then((m) => m.ViewQuizComponent) },
    ]
  },
];

export default quizRoutes;
