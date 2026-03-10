import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

export interface QuizHomeList{
  title: string;
  desc:string;
  buttonText:string;
  buttonRoute:string;
}
@Component({
    selector: 'app-quiz-home',
    imports: [
        RouterModule,
        MatCardModule
    ],
    templateUrl: './quiz-home.component.html',
    styleUrl: './quiz-home.component.scss'
})
export class QuizHomeComponent {
  list : QuizHomeList[]= [
    {
      title: 'Make your own quiz!',
      desc: 'Import from CSV or Start from the scratch',
      buttonText: 'Create',
      buttonRoute: '../create'
    },
    {
      title: 'Binge in Quizzing!',
      desc: 'Checkout all quizzes',
      buttonText: 'Explore!',
      buttonRoute: '../view'
    },
    // {
    //   title: 'Make your own quiz!',
    //   desc: 'Import from CSV or Start from the scratch',
    //   buttonText: 'Create',
    //   buttonRoute: '../create'
    // },
    // {
    //   title: 'Make your own quiz!',
    //   desc: 'Import from CSV or Start from the scratch',
    //   buttonText: 'Create',
    //   buttonRoute: '../create'
    // },
    // {
    //   title: 'Make your own quiz!',
    //   desc: 'Import from CSV or Start from the scratch',
    //   buttonText: 'Create',
    //   buttonRoute: '../create'
    // },
    // {
    //   title: 'Make your own quiz!',
    //   desc: 'Import from CSV or Start from the scratch',
    //   buttonText: 'Create',
    //   buttonRoute: '../create'
    // },
    // {
    //   title: 'Make your own quiz!',
    //   desc: 'Import from CSV or Start from the scratch',
    //   buttonText: 'Create',
    //   buttonRoute: '../create'
    // },
    // {
    //   title: 'Make your own quiz!',
    //   desc: 'Import from CSV or Start from the scratch',
    //   buttonText: 'Create',
    //   buttonRoute: '../create'
    // },
    // {
    //   title: 'Make your own quiz!',
    //   desc: 'Import from CSV or Start from the scratch',
    //   buttonText: 'Create',
    //   buttonRoute: '../create'
    // },
    // {
    //   title: 'Make your own quiz!',
    //   desc: 'Import from CSV or Start from the scratch',
    //   buttonText: 'Create',
    //   buttonRoute: '../create'
    // }
  ];
}
