import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CdkDrag, CdkDragHandle, CdkDragPlaceholder, CdkDragPreview, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QuizService } from '../../../../services/quiz.service';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { Question, QuestionForm, QuizForm } from '../../../../models/quiz.model';
import { IconButtonClassList, TextButtonClassList } from '../../../../constants/layout.constants';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@Component({
    selector: 'app-quiz-preview',
    imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        MatButtonModule,
        TitleCasePipe,
        DatePipe,
        CdkAccordionModule,
        MatTabsModule,
        MatStepperModule,
        CdkDropList, CdkDrag, CdkDragHandle, CdkDragPlaceholder,// CdkDragPreview,
        MatSlideToggleModule
    ],
    templateUrl: './quiz-preview.component.html',
    styleUrl: './quiz-preview.component.scss'
})
export class QuizPreviewComponent implements OnInit{

  quizService = inject(QuizService);
  preview = this.quizService.createQuizForm;
  rootFormGroup = inject(FormGroupDirective);
  createQuizForm !: FormGroup<QuizForm>;

  ngOnInit(): void {
    this.createQuizForm = this.rootFormGroup.form;
  }

  selectedQuestion : QuestionForm | null = null;
  selectedQuestionIndex !: number|undefined;

  txtBtnclass = TextButtonClassList('primary');
  iconBtnClass = IconButtonClassList;

  get questions() {
    return this.quizService.questions;
  }

  drop(event: any) {
    moveItemInArray(this.questions.controls, event.previousIndex, event.currentIndex);
  }
  moveUp(){
    if(!this.selectedQuestionIndex){
      return;
    }
    moveItemInArray(this.questions.controls, this.selectedQuestionIndex, this.selectedQuestionIndex-1);
    this.selectedQuestionIndex -= 1;
  }

  moveDown(){
    if(!this.selectedQuestionIndex || this.selectedQuestionIndex == this.questions.controls.length-1){
      return;
    }
    moveItemInArray(this.questions.controls, this.selectedQuestionIndex, this.selectedQuestionIndex+1);
    this.selectedQuestionIndex += 1;
  }

  moveTop(){
    if(!this.selectedQuestionIndex){
      return;
    }
    moveItemInArray(this.questions.controls, this.selectedQuestionIndex, 0);
    this.selectedQuestionIndex = 0;
  }
  moveBottom(){
    const lastQuestionIndex = this.questions.controls.length-1;
    if(!this.selectedQuestionIndex || this.selectedQuestionIndex == lastQuestionIndex){
      return;
    }
    moveItemInArray(this.questions.controls, this.selectedQuestionIndex, this.questions.controls.length);
    this.selectedQuestionIndex = lastQuestionIndex;
  }
  resetSelection(){
    this.selectedQuestionIndex = undefined;
  }
  transform(html: string) {
    return this.quizService.transform(html);
  }
  selectQuestion(index: number, isShuffleEnabled: boolean|null|undefined ){
    // console.log('selected', question, index);
    if(isShuffleEnabled){
      return;
    }
    this.selectedQuestionIndex = index;
  }
}
