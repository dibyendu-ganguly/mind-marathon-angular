import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { Component, computed, ElementRef, inject, OnInit, signal, TemplateRef, effect } from '@angular/core';
import { ThemeService } from '../../services/layout.service';
import { HomeWidgetComponent } from './home-widget/home-widget.component';
import { LinkClassList, TextButtonClassList } from '../../constants/layout.constants';
import { HomeQuote, HomeWidget, OnThisDayEventData, OnThisDayEvents } from '../../models/home-widget.model';
import { CommonService } from '../../services/common.service';
import { HomeService } from '../../services/home.service';
import { AsyncPipe, DatePipe, NgTemplateOutlet } from '@angular/common';
import { CarouselComponent, CarouselItem } from "../shared/carousel/carousel.component";
import { CdkDragPlaceholder } from "@angular/cdk/drag-drop";
import { MatMenuItem, MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MONTH_MAP } from '../../constants/common.constants';
@Component({
  selector: 'app-home',
  imports: [
    HomeWidgetComponent,
    AsyncPipe,
    CarouselComponent,
    NgTemplateOutlet,
    // CdkDragPlaceholder,
    DatePipe,
    RouterLink,
    MatMenuItem, MatMenu, MatMenuTrigger,
    CdkDragPlaceholder,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  quotes!: Observable<HomeQuote>;
  // onThisdayEvents!: Observable<OnThisDayEventData | undefined>;
  events!: Observable<{header: string, description: string, link: string, timestamp: Date}[]>;

  private commonService = inject(CommonService);
  private homeService = inject(HomeService);
  
  onThisdayEvents = this.getOnThisDayEvents();

  selectedMonthInWords = signal<string>(this.homeService.todayMonthInWords());
  selectedDay = signal<number>(this.homeService.todayDay());

  monthsList = [...Object.values(MONTH_MAP)];
  daysList = computed(() => {
    let days = 31;
    if(this.selectedMonthInWords() === 'February'){
      days = 28;
    } else if (this.selectedMonthInWords() === 'April' || this.selectedMonthInWords() === 'June' || this.selectedMonthInWords() === 'September' || this.selectedMonthInWords() === 'November'){
      days = 30;
    }
    return Array.from({length: days}, (_, i) => i + 1);
  });

  ngOnInit(): void {
    this.quotes = this.getQuoteOfTheDay();
    this.events = this.getEvents();
  }
  theme = inject(ThemeService).getTheme();
  private readonly elementRef: ElementRef<any> = inject(ElementRef);



  btnClass = TextButtonClassList('primary');
  getStartedBtnClass = TextButtonClassList('primary') + ' md:my-8 py-1 px-2 md:py-4 md:px-8 md:text-2xl rounded-md mt-4 w-max';
  seeEventBtnClass = TextButtonClassList('secondary') + ' hidden lg:block py-1 px-2 md:py-3 md:px-6 rounded-md w-max hover:underline';
  iconClass = LinkClassList;

  widgets : HomeWidget[] = [
    {
      text: 'Build',
      secondaryText: 'Create your own quiz',
      color: 'primary',
      image: 'https://via.placeholder.com/150',
      icon: 'building-add'
    },
    {
      text: 'Play',
      secondaryText: 'Challenge yourself with existing quizzes',
      color: 'primary',
      image: 'https://via.placeholder.com/150',
      icon: 'controller'
    },
    {
      text: 'Learn',
      secondaryText: 'Explore from a wide range of topics',
      color: 'primary',
      image: 'https://via.placeholder.com/150',
      icon: 'graph-up-arrow'
    }
  ];

  scrollToElemById(id:string){
    this.commonService.scrollToElementByQuery(this.elementRef, id);
  }

  getQuoteOfTheDay(){
    return this.homeService.getQuoteOfTheDay();
  }

  todayDay = this.homeService.todayDay;
  todayMonthInWords = this.homeService.todayMonthInWords;
  // today = this.homeService.todayDate();


  getOnThisDayEvents(){
    return this.homeService.getEventsOfTheDay();
  }

  mapOnThisDayEvents(events: OnThisDayEvents[]): CarouselItem[] {
    return events?.map(e => ({ kind: 'text' as const, header: e.year, description: e.description, menuItems: e.wikipedia.map(w => ({ text: w.title, link: w.wikipedia })) })) ?? [];
  }

  getEvents(){
    return of([
      {header: 'Event 1', description: 'Description for event 1', link: 'https://example.com/event1', timestamp: new Date()},
      {header: 'Event 2', description: 'Description for event 2', link: 'https://example.com/event2', timestamp: new Date(2025,1,1)},
      {header: 'Event 3', description: 'Description for event 3', link: 'https://example.com/event3', timestamp: new Date(2020,1,1)},
      {header: 'Event 1', description: 'Description for event 1', link: 'https://example.com/event1', timestamp: new Date(2025,1,1)},
      {header: 'Event 2', description: 'Description for event 2', link: 'https://example.com/event2', timestamp: new Date(2025,2,1)},
      {header: 'Event 3', description: 'Description for event 3', link: 'https://example.com/event3', timestamp: new Date(2025,1,2)},      
      {header: 'Event 1', description: 'Description for event 1', link: 'https://example.com/event1', timestamp: new Date(2015,1,1)},
      {header: 'Event 2', description: 'Description for event 2', link: 'https://example.com/event2', timestamp: new Date(2025,2,2)},
      {header: 'Event 3', description: 'Description for event 3', link: 'https://example.com/event3', timestamp: new Date()},      
      {header: 'Event 1', description: 'Description for event 1', link: 'https://example.com/event1', timestamp: new Date(2045,1,1)},
    ].sort((b,a)=>a.timestamp.getTime() - b.timestamp.getTime()));
  }

  dialogService = inject(MatDialog);
  openChangeDateModal(changeDateModal:TemplateRef<any>){
    this.dialogService.open(changeDateModal);
  }

  applyNewOnThisDayDate(){
    this.homeService.updateTodayDate(this.selectedDay(), this.selectedMonthInWords());
    this.dialogService.closeAll();
  }

}
