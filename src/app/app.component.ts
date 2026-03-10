import { Component, computed, ElementRef, HostListener , inject, Inject, OnInit, Renderer2, signal } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent, RouterOutlet, Event } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NavigationHeaderComponent, ProgressMode } from './components/layout/navigation-header/navigation-header.component';
import { TestPlaceholderComponent } from './components/layout/test-placeholder/test-placeholder.component';
import { ThemeService } from './services/layout.service';
import { ChatService } from './services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FooterComponent } from "./components/layout/footer/footer.component";
import { ChatButtonComponent } from './components/layout/chat-button/chat-button.component';
import { DOCUMENT } from '@angular/common';
import { FullScreenModeListenerDirective } from './directives/full-screen-mode-listener.directive';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavigationHeaderComponent,
        CommonModule, FormsModule
        // TestPlaceholderComponent
        ,
        // FullScreenModeListenerDirective,
        ChatButtonComponent,
        FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  themeService = inject(ThemeService);


  // Sets initial value to true to show loading spinner on first load

  mode = signal<ProgressMode>('determinate');

  constructor(private router: Router,
    private chatService: ChatService,
    @Inject(DOCUMENT) private document: any,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.router.events.subscribe((e : Event) => {
       this.navigationInterceptor(e);
     })
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.mode.set('indeterminate');
    }
    if (event instanceof NavigationEnd) {
      this.mode.set('determinate');
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.mode.set('indeterminate');
    }
    if (event instanceof NavigationError) {
      this.mode.set('determinate');
    }
  }

  ngOnInit(): void {
    initFlowbite();
    document.documentElement.classList.add(this.themeService.getTheme());

    this.themeService.elem = document.documentElement;
    this.themeService.document= this.document;
    console.log(sessionStorage.getItem('key'))


    // const headers = new HttpHeaders()
    // .set('Authorization','token de9c2e9db9a0933ff6f23fb0399cbae979b33ede');
    // this.http.get('https://api.socialpostai.com/api/users/',{headers:headers}).subscribe({
    //   next: (data)=>{
    //     console.log(data);
    //   }
    // });
  }
  settings = {
    lst: signal(new Date())
  }
  lastRefreshTime = computed(()=>this.settings.lst());
  // ngAfterViewInit() {
  //   const childElement = this.document.createElement('script');
  //   childElement.type = "text/javascript";
  //   childElement.innerHTML = "function googleTranslateElementInit() { new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element'); } ";

  //   this.renderer.appendChild(this.el.nativeElement, childElement);


  //   const v = document.createElement("script");
  //   v.type = "text/javascript";
  //   v.innerHTML = "function googleTranslateElementInit() { new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element'); } ";
  //   this.elementRef.nativeElement.appendChild(v);
  //   var s = document.createElement("script");
  //   s.type = "text/javascript";
  //   s.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  //   this.elementRef.nativeElement.appendChild(s);
  // }


  http = inject(HttpClient)

  title = 'MindMarathonAngular';
  googleTranslatorHidden = this.themeService.googleTranslatorHidden;

  gotoFullScrren(){
    this.themeService.openFullscreen();
  }

  isFullscreen(): boolean {
    return !!(document.fullscreenElement || this.document.webkitFullscreenElement || this.document.mozFullScreenElement || this.document.msFullscreenElement);
  }


  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:msfullscreenchange', ['$event'])
  onFullscreenChange(event: any) {
    const isFullscreen = this.isFullscreen();
    this.themeService.isFullScreen.set(isFullscreen);
    console.log('Is fullscreen:', event, isFullscreen);
    if(!isFullscreen){
      this.themeService.updateFullScreenLeftCount();
    }
  }
}
