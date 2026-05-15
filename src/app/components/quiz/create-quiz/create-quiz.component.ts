import { Component, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CreateQuizFormComponent } from './create-quiz-form/create-quiz-form.component';
import { CreateQuizImportComponent } from './create-quiz-import/create-quiz-import.component';
import { QuizService } from '../../../services/quiz.service';
import { TextButtonClassList } from '../../../constants/layout.constants';
import { RouterModule } from '@angular/router';

export type CreateQuizCompViewTypes = 'start' | 'import' | 'form'

@Component({
    selector: 'app-create-quiz',
    imports: [
        RouterModule,
        CreateQuizFormComponent,
        CreateQuizImportComponent,
        // IconButtonComponent,
    ],
    templateUrl: './create-quiz.component.html',
    styleUrl: './create-quiz.component.scss'
})
export class CreateQuizComponent implements OnInit {

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
  }

  class = TextButtonClassList('primary') + ' w-full';
  view : Signal<CreateQuizCompViewTypes> = this.quizService.createQuizView;

  updateCreateQuizView(view: CreateQuizCompViewTypes){
    this.quizService.updateCreateQuizView(view);
  }

}

