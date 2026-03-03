import { animate, style, transition, trigger } from "@angular/animations";

export const ToggleAnimation = trigger('togglingState',[
  transition('*=>*',[
    style({
      opacity:0,
      transform: 'translateY(-100%)'
    }),
    animate('15000ms ease-in'),
    style({ 
      opacity:1,
      transform: 'translateY(0)'
    })
  ]),
  transition(':leave',[
    style({
      opacity:1
    }),
    animate('1500ms ease-out'),
    style({ 
      opacity:0,
      transform: 'translateY(-100%)'
    })
  ]),
])
