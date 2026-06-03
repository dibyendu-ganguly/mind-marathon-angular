import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { map, tap } from 'rxjs';

export const createQuizGuard: CanActivateFn = (route, state) => {
  const quizService = inject(QuizService);
  const router = inject(Router);

  const confirmDialogData = quizService.createQuizCanActivateConfirmDialogData();
  if (!confirmDialogData) {
    return true;
  }

  const dialog = inject(MatDialog);
  // Opens the modal and returns true/false based on user action
  const dialogRef = dialog
    .open(ConfirmDialogComponent, {
      data: confirmDialogData,
    })
  return dialogRef.afterClosed().pipe(
      map((result) => {
      if (!result) {
        // User cancelled, reset create quiz view to 'start'
        quizService.updateCreateQuizView('start');
      }
      //Allow navigation
      return true;
    })
  );

  // Redirect to login page
  return router.parseUrl('/login');
};
