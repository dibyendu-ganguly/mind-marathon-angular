import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer } from '@angular/platform-browser';
import { QuestionForm, QuizForm } from '../../../../models/quiz.model';
import { QuizService } from '../../../../services/quiz.service';
import { QuestionAddAnimation } from './question-create.animation';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-question-block',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatTooltipModule,
        MatRadioModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatButtonToggleModule,
        TextFieldModule,
    ],
    templateUrl: './question-block.component.html',
    styleUrl: './question-block.component.scss',
    animations: [QuestionAddAnimation]
})
export class QuestionBlockComponent implements OnInit {
  createQuizForm!: FormGroup<QuizForm>;
  dialog = inject(MatDialog);
  fb = inject(FormBuilder);
  quizService = inject(QuizService);
  rootFormGroup = inject(FormGroupDirective);
  sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    this.createQuizForm = this.rootFormGroup.form;
  }

  get questions() {
    return this.quizService.questions;
  }

  removeQuestion(i: number) {
    this.questions.removeAt(i);
  }

  copyQuestion(i: number) {
    const current_question = this.questions.controls[i].value;
    current_question.title = 'Question '+(i+2);
    const question = this.quizService.buildQuestion(i);
    question.patchValue(current_question);
    this.questions.insert(i + 1, question);
    const file = this.questions.get([i, 'file'])?.value;
    // console.log({file});
    // console.log(i, question, file);

    if (file) {
      this.questions.get([i + 1, 'file'])?.setValue(file);
      if (file.type.includes('video/')) {
        const URL = window.URL;
        this.questions
          .get([i + 1, 'fileSrc'])
          ?.setValue(
            this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file))
          );
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.questions.get([i, 'fileSrc'])?.setValue(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onFileSelected(event: any, index: number) {
    console.log('event', event, 'id', index);
    console.log(this.questions.get([index, 'file'])?.value);

    if (event?.target?.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.questions.get([index, 'file'])?.setValue(file);

      if (file.type.includes('video/')) {
        // const reader = new FileReader();
        // reader.readAsArrayBuffer(file);
        // reader.onload = (e:any) => {
        //   console.log('e>>>',e);
        //   // The file reader gives us an ArrayBuffer:
        //   let buffer = e.target.result;

        //   // We have to convert the buffer to a blob:
        //   let videoBlob = new Blob([new Uint8Array(buffer)], { type: 'video/webm' });

        //   // The blob gives us a URL to the video file:
        //   let url = window.URL.createObjectURL(videoBlob);

        //   this.fileSrc[index] = this.sanitizer.bypassSecurityTrustUrl( url );
        //   console.log('this.fileSrc[index]',this.fileSrc[index]);

        // }
        const URL = window.URL;
        const fileSrc = this.sanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(file)
        );
        this.questions.get([index, 'fileSrc'])?.setValue(fileSrc);
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.questions.get([index, 'fileSrc'])?.setValue(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
    // else {
    //   this.questions.get([index, 'file'])?.setValue(null);
    //   this.fileSrc[index] = null;
    // }

    console.log(this.questions.get([index, 'file'])?.value);
    console.log(
      'this.fileSrc[index] >>',
      this.questions.get([index, 'fileSrc'])?.value
    );
    console.log('createQuizForm.value >> ', this.createQuizForm.value);
  }
  removeFile(index: number) {
    const fileControl = this.questions.controls[index].controls.file;
    const fileSrcControl = this.questions.controls[index].controls.fileSrc;

    fileControl.markAsUntouched();
    fileControl.setValue(null);
    fileControl.updateValueAndValidity();
    fileSrcControl.markAsUntouched();
    fileSrcControl.setValue(null);
    fileSrcControl.updateValueAndValidity();
  }

  transform(html: string) {
    return this.quizService.transform(html);
  }
  onSubmit(): void {
    // alert('Thanks!');
    console.log(
      '>>',
      this.createQuizForm.valid,
      this.createQuizForm.get('questions')?.value.length
    );
    if (
      this.createQuizForm.valid &&
      this.createQuizForm.controls.questions?.value.length > 0
    ) {
      console.log(this.createQuizForm.value);
    }
  }

  // setRole(){
  //   this.authService.role = 'qq';
  // }
  // getRole(){
  //   console.log(this.authService.role);
  // }
  @ViewChild('previewTab') previewTab!: TemplateRef<any>;
  previewFileType!: string;
  previewFileSrc!: any;
  previewFile!: File;
  showPreview(srcObj: any, fileType: string, i: number) {
    console.log(srcObj);
    this.previewFileType = fileType;
    this.previewFileSrc = srcObj;
    this.previewFile = this.questions.get([i, 'file'])?.value;

    this.dialog.open(this.previewTab, {
      width: '600px',
      disableClose: true,
    });
  }

  onAnswerTypeChanged(index: number) {
    //Mark answer field untouched and reset value
    const answerControl = this.questions.controls[index].controls.answer;
    answerControl.markAsUntouched();
    answerControl.setValue(null);
    answerControl.updateValueAndValidity();

    this.updateOptionsRequired(index);
  }

  updateOptionsRequired(index: number) {
    const indexedOptions =
      this.questions.controls[index].controls.options.controls; //.controls.isWithOptions;
    const isWithOption =
      this.questions.controls[index].controls.answerType.value === 'Option';

    // if isWithOption is enabled add required to options
    if (isWithOption) {
      const addRequire = this.updateControlRequired('add');
      indexedOptions.forEach((optionControl) => {
        addRequire(optionControl);
      });
    } else {
      const removeRequire = this.updateControlRequired('remove');
      indexedOptions.forEach((optionControl) => {
        removeRequire(optionControl);
      });
    }
  }

  getQuestion(index: number) {
    return this.quizService.questions.controls[index];
  }

  addOption(questionNumber: number) {
    // questions.controls[i].controls.options.controls
    this.getQuestion(questionNumber).controls.options.push(
      this.quizService.getNewOption()
    );
    this.updateOptionsRequired(questionNumber);
  }

  removeOption(questionNumber: number, optionIndex: number) {
    this.getQuestion(questionNumber).controls.options.removeAt(optionIndex);
    this.updateOptionsRequired(questionNumber);
  }

  updateControlRequired(action: 'add' | 'remove') {
    return (control: AbstractControl) => {
      control.markAsUntouched();
      if (action === 'add') {
        control.addValidators(Validators.required);
        control.updateValueAndValidity();
      } else {
        control.removeValidators(Validators.required);
        control.updateValueAndValidity();
      }
    };
  }

  lastQuestionIndex = () => this.questions.controls.length - 1;
  moveUp(selectedQuestionIndex: number) {
    if (!selectedQuestionIndex) {
      return;
    }
    moveItemInArray(
      this.questions.controls,
      selectedQuestionIndex,
      selectedQuestionIndex - 1
    );
  }

  moveDown(selectedQuestionIndex: number) {
    if (
      selectedQuestionIndex < 0 || selectedQuestionIndex == this.lastQuestionIndex()
    ) {
      return;
    }
    moveItemInArray(
      this.questions.controls,
      selectedQuestionIndex,
      selectedQuestionIndex + 1
    );
  }

  moveTop(selectedQuestionIndex: number) {
    if (!selectedQuestionIndex) {
      return;
    }
    moveItemInArray(this.questions.controls, selectedQuestionIndex, 0);
  }
  moveBottom(selectedQuestionIndex: number) {
    const lastQuestionIndex = this.questions.controls.length - 1;
    if (selectedQuestionIndex < 0 || selectedQuestionIndex == this.lastQuestionIndex()) {
      return;
    }
    moveItemInArray(
      this.questions.controls,
      selectedQuestionIndex,
      this.questions.controls.length
    );
  }
}
