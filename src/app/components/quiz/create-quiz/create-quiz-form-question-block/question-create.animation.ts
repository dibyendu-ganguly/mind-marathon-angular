import { animate, style, transition, trigger } from "@angular/animations";

export const QuestionAddAnimation = trigger('questionAddingState',[
  transition(':enter',[
    style({
      opacity:0
    }),
    animate(500),
    style({ opacity:1})
  ])
])
