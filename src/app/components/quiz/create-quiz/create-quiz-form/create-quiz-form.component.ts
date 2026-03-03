import { Component, ElementRef, inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuizService } from '../../../../services/quiz.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormField, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QuestionBlockComponent } from '../create-quiz-form-question-block/question-block.component';
import { QuizForm } from '../../../../models/quiz.model';
import { ScrollToFirstInvalidFormFieldDirective } from '../../../../directives/scroll-to-first-invalid-form-field-directive.directive';
import { TextButtonClassList } from '../../../../constants/layout.constants';
import {provideNativeDateAdapter} from '@angular/material/core';
import { QuizPreviewComponent } from '../quiz-preview/quiz-preview.component';

@Component({
  selector: 'app-create-quiz-form',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule, MatNativeDateModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatTooltipModule,
    QuestionBlockComponent,
    QuizPreviewComponent,
    ReactiveFormsModule,
    ScrollToFirstInvalidFormFieldDirective,
    MatFormFieldModule
  ],
   providers: [provideNativeDateAdapter()],
  templateUrl: './create-quiz-form.component.html',
  styleUrl: './create-quiz-form.component.scss'
})
export class CreateQuizFormComponent implements OnInit {

  class = TextButtonClassList;

  constructor(private quizService: QuizService) { }
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.createQuizForm = this.quizService.createQuizForm;
  }

  createQuizForm !: FormGroup;
  get questions() {
    return this.quizService.questions;
  }

  addQuestion(questionNumber: number) {
    this.questions.push(this.quizService.buildQuestion(questionNumber));
  }


  @ViewChild(QuestionBlockComponent) childComponents!: QuestionBlockComponent;

  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
      else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
      else if (control instanceof FormArray) {
        control.controls.forEach(e => {
          if(e instanceof FormGroup){
            this.validateAllFields(e as FormGroup);
          } else if(e instanceof FormControl) {
            e.markAsTouched({ onlySelf: true });
          }
        })
      }
    });
  }

  onSubmit(): void {
    console.log('>>', this.createQuizForm.valid, this.createQuizForm.get('questions')?.value.length);
    // this.createQuizForm.controls.questions.controls.forEach(e=>{
    //   this.validateAllFields(e);
    // })
    this.validateAllFields(this.createQuizForm);

    if (this.createQuizForm.valid && this.createQuizForm.controls['questions']?.value.length > 0) {
      console.log(this.createQuizForm.value);
    }
  }

  private readonly elementRef = inject(ElementRef);
  private scrollToFirstInvalidControl(): void {
    let form = document.getElementById('quiz-form')!; // <-- your formID
    let firstInvalidControl = form.getElementsByClassName('ng-invalid')[0];
    // const invalidFields = this.elementRef.nativeElement.querySelectorAll('.ng-invalid');
    // const firstInvalidField = invalidFields[0];

    firstInvalidControl.scrollIntoView({ block: "center", behavior: 'smooth' });
    console.log(firstInvalidControl);
    // (firstInvalidControl as Element).childNodes.forEach(e=> (e as Element).focus()) //focus();
  }
}
