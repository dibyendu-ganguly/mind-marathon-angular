import { DomSanitizer } from '@angular/platform-browser';
import { computed, inject, Injectable, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionForm, AnswerType, QuizForm, Options, QuizRoundsForm } from '../models/quiz.model';
import { CreateQuizCompViewTypes } from '../components/quiz/create-quiz/create-quiz.component';
import { ConfirmDialogData } from '../components/shared/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private _createQuizView = signal<CreateQuizCompViewTypes>('start');
  readonly createQuizView = this._createQuizView.asReadonly();
  updateCreateQuizView(view: CreateQuizCompViewTypes){
    this._createQuizView.set(view);
  }
  createQuizCanActivateConfirmDialogData = computed<ConfirmDialogData|undefined>(()=>{
    if(this.createQuizView() === 'import'){
      return {
        title: 'Continue importing or Change mode?',
        message: 'Do you want to continue to the previous import or switch to another mode?',
        cancelBtnText: 'Switch Mode',
        confirmBtnText: 'Continue'
      };
    } else if(this.createQuizView() === 'form') {
      return {
        title: 'Change mode?',
        message: 'You have unsaved changes in the quiz form. Do you want to switch to other mode now?',
        cancelBtnText: 'Switch Mode',
        confirmBtnText: 'Keep Editing form!'
      };
    }
    return;
  });

  constructor() { }

  fb = inject(FormBuilder);
  createQuizForm = this.getInitialForm();


  private getInitialForm() : FormGroup<QuizForm> {
    return this.fb.group({
      quizName: new FormControl<string | null>(null, Validators.required),
      quizDateTime: new FormControl<string | null>(null, Validators.required),
      quizTime: new FormControl<string | null>(null, Validators.required),
      duration: new FormControl<number | null>(0, Validators.required),//[0,Validators.required],
      rounds: this.fb.array([this.buildRound(1)]),
      description: new FormControl<string | null>(null),
      questions: this.fb.array([this.buildQuestion(1)]),
      settings: this.fb.group({
        questionShuffle : [false]
      })
    });
  }

  buildRound(roundNo : number): FormGroup<QuizRoundsForm> {
    return this.fb.group({
          roundOrder : new FormControl<number | null>(1, Validators.required),
          roundName : new FormControl<string | null>('Round '+roundNo, Validators.required),
          questions : this.fb.array([this.buildQuestion(1)])
        });
  }
  buildQuestion(index : number): FormGroup<QuestionForm> {
    return this.fb.group({
      title: new FormControl<string | null>('Question '+ index),
      question: new FormControl<string | null>(null, Validators.required),
      file: new FormControl<any>(null),
      fileSrc: new FormControl<any>(null),
      answer: new FormControl<string | null>(null, Validators.required),
      answerType : new FormControl<AnswerType | null>('Text'),
      options: this.fb.array([
         new FormControl<Options>(null),
         new FormControl<Options>(null),
         new FormControl<Options>(null),
         new FormControl<Options>(null)
      ])
    })
  }
  getNewOption(){
    return  new FormControl<Options>(null);
  }

  sanitizer = inject(DomSanitizer);
  transform(html: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(html);
  }

  get rounds() {
    return <FormArray<FormGroup<QuizRoundsForm>>>this.createQuizForm.controls.rounds;
  }
  get questions() {
    return <FormArray<FormGroup<QuestionForm>>>this.createQuizForm.controls.questions;
  }

  reInitializeQuiz(){
    this.createQuizForm = this.getInitialForm();
  }
  resetQuiz(){
    this.createQuizForm.reset();
  }

}
