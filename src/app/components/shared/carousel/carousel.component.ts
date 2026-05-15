import { JsonPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { LinkClassList } from '../../../constants/layout.constants';

export type CarouselItem = {
  kind: 'image';
  image: string;
  alt: string;
} | {
  kind: 'text';
  header: string;
  description: string;
  menuItems: { 
    text:string, 
    link:string
  }[];
}
// event.description
@Component({
  selector: 'app-carousel',
  imports: [ MatMenuItem, MatMenu, MatMenuTrigger],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  items = input.required<CarouselItem[]>();
  
  carouselType = input<'static' | 'slide'>('slide');
  duration = input(0);

  iconClass = "text-primary! hover:text-tertiary! pointer cursor-pointer transition-colors duration-300";

  private intervalId: any;

  ngOnInit() {
    if(this.carouselType() === 'slide' && this.duration() >= 3000) {
      // Update the signal every duration milliseconds
      this.intervalId = setInterval(() => {
        this.currentItemIndex = (this.currentItemIndex + 1) % this.items().length;
      }, this.duration());
    }
  }
  currentItemIndex = 0;
  setCurrentItem(index:number){
    this.currentItemIndex = index;
  }

  ngOnDestroy() {
    // Clear the interval to prevent memory leaks
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
