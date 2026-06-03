import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, effect, resource } from '@angular/core';
import { catchError, debounceTime, delay, forkJoin, from, map, mergeMap, Observable, of, retry, shareReplay } from 'rxjs';
import { HomeQuote, OnThisDayEventAPIResponse, OnThisDayEventData, OnThisDayEvents } from '../models/home-widget.model';
import { MONTH_MAP } from '../constants/common.constants';
import { rxResource } from '@angular/core/rxjs-interop';



@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }
  http = inject(HttpClient);

  private quote$!: Observable<HomeQuote>;
  getQuoteOfTheDay(): Observable<HomeQuote> {
    if (!this.quote$) {
      this.quote$ = this.http.get<HomeQuote>('https://motivational-spark-api.vercel.app/api/quotes/random').pipe(
        // retry(),
        shareReplay({ bufferSize: 1, refCount: true })
      );
    }
    return this.quote$;
  }

  private _todayDate = signal(new Date());
  updateTodayDate(day: number, monthInWords: string){
    console.log({day, monthInWords});
    const monthNumber = Object.entries(MONTH_MAP).find(([_, month]) => month === monthInWords)?.[0];
    if(!monthNumber || (day === this.todayDay()) || (monthInWords === this.todayMonthInWords())) return;
    const newDate = new Date();
    newDate.setDate(day);
    newDate.setMonth(parseInt(monthNumber) - 1);
    this._todayDate.set(newDate);
  }
  todayDate = this._todayDate.asReadonly();
  todayDay = computed(() => this._todayDate().getDate());
  todayMonth = computed(() => this._todayDate().getMonth() + 1);
  todayMonthInWords = computed(() => MONTH_MAP[this.todayMonth() as keyof typeof MONTH_MAP] ?? 'Unknown');


  // todayDateEffect = effect(() => {
  //   // this.todayDate();
  //   console.log(`Today's date is ${this.todayDate()}`);
  // });

  // private events$: Observable<OnThisDayEventData>;
  getEventsOfTheDay() {
    //}: Observable<OnThisDayEventData | undefined> {
    // if (!this.events$) {

    //   this.events$ = forkJoin(['events','births','deaths'].map(eventType => this.http.get<OnThisDayEventAPIResponse>(`https://byabbe.se/on-this-day/${this.todayMonth()}/${this.todayDay()}/${eventType}.json`))).pipe(
    //     map(([eventsResponse, birthsResponse, deathsResponse]) => {
    //       const events: OnThisDayEvents[] = eventsResponse.events?? [];
    //       const births: OnThisDayEvents[] = birthsResponse.births?? [];
    //       const deaths: OnThisDayEvents[] = deathsResponse.deaths?? [];
    //       console.log({Events: events, Births: births, Deaths: deaths});
    //       return {Events: events, Births: births, Deaths: deaths};
    //     }),
    //     // retry(),
    //     delay(15000),
    //     shareReplay({ bufferSize: 1, refCount: true })
    //   );
    // }
    // console.log(this.events$,this.events$.status(),this.events$.isLoading(),this.events$.value())
    return this.events$;
  }

  private events$ = rxResource<OnThisDayEventData, Date>({
    request: () => this._todayDate(),
    loader: ({ request, abortSignal }) => {
      return forkJoin(['events','births','deaths'].map(eventType => this.http.get<OnThisDayEventAPIResponse>(`https://byabbe.se/on-this-day/${this.todayMonth()}/${this.todayDay()}/${eventType}.json`)))
        .pipe(
          map(([eventsResponse, birthsResponse, deathsResponse]) => {
            const events: OnThisDayEvents[] = eventsResponse.events?? [];
            const births: OnThisDayEvents[] = birthsResponse.births?? [];
            const deaths: OnThisDayEvents[] = deathsResponse.deaths?? [];
            // console.log({Events: events, Births: births, Deaths: deaths});
            return {Events: events, Births: births, Deaths: deaths};
          }),
          // retry(),
          // delay(15000),
          shareReplay({ bufferSize: 1, refCount: true }),
          catchError(error => {
            console.error('Error fetching on this day events:', error);
            return of({Events: [], Births: [], Deaths: []} as OnThisDayEventData);
          })
        );
    }

  });
}
