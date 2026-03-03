import { FormArray, FormControl, FormGroup } from "@angular/forms";

export interface Quiz {
  quizName: string;
  quizDateTime: string;
  quizTime: string;
  duration: number;
  description: string;
  questions: Question[];
}
// export type ToFormType<T> = FormGroup<{
//   [K in keyof T]: T[K] extends object
//       ? T[K] extends Date
//           ? FormControl<T[K] | null>
//           : T[K] extends File
//             ? FormControl<T[K] | null>
//             : T[K] extends unknown[]
//               ? FormArray<ToFormType< T[K] extends (infer V)[] ? V : T[K]> >
//               : ToFormType<T[K]>
//       : FormControl<T[K] | null>;
// }>;

// export type QuizForm = ToFormType<Quiz>;

export interface QuizForm {
  quizName: FormControl<string | null>;
  quizDateTime: FormControl<any>;
  quizTime: FormControl<any>;
  duration: FormControl<number | null>;
  description: FormControl<string | null>;
  rounds: FormArray<FormGroup<QuizRoundsForm>>;
  questions: FormArray<FormGroup<QuestionForm>>;
  settings: FormGroup<QuizSettingsForm>;
}

export interface QuizSettingsForm {
  questionShuffle : FormControl<boolean | null>;
}

export interface Question {
  title: string;
  question: string;
  file: File;
  fileSrc: string | ArrayBuffer | null | unknown;
  answer: string;
  answerType: AnswerType;
  options: string[] | null[];
}

export interface QuizRoundsForm{
  roundOrder: FormControl<number | null>;
  roundName: FormControl<string | null>
  questions: FormArray<FormGroup<QuestionForm>>;
}

export type AnswerType = 'Text' | 'Option' | 'YesNo';
export interface QuestionForm {
  title: FormControl<string | null>;
  question: FormControl<string | null>;
  file: FormControl<File | null>;
  fileSrc: FormControl<string | ArrayBuffer | null | any>;
  answer: FormControl<string | null>;
  answerType: FormControl<AnswerType | null>;
  options: FormArray<FormControl<Options>>;
}

export type Options =  string | null;
//  {
//   option: string;
// }
// export type OptionsForm =  ToFormType<Options>;

// export interface OptionsForm  {
//   option1: FormControl<string | null>;
//   option2: FormControl<string | null>;
//   option3: FormControl<string | null>;
//   option4: FormControl<string | null>;
// }
