import { computed, effect, inject, Injectable, Renderer2, signal } from '@angular/core';

export type ColorScheme = 'light'|'dark';
// type ContrastOption = 'standard'|'medium'|'high';

export const CONTRAST = {
  'standard' : '',
  'medium' : '-medium-contrast',
  'high' : '-high-contrast'
} as const;
export const CONTRAST_OPTIONS = Object.entries(CONTRAST);
export type ContrastOption = typeof CONTRAST[keyof typeof CONTRAST];

@Injectable({
  providedIn: 'root'
})
export class ThemeService {


  constructor() { }

  //#region Theme 
  colorScheme = signal<ColorScheme>('light');

  contrast = signal<ContrastOption>(CONTRAST.standard);

  private theme = computed(()=>this.colorScheme()+this.contrast())

  googleTranslatorHidden = signal(true);

  getTheme(){
    return this.theme;
  }
  themeEffect = effect(()=>{
    const classList = document.documentElement.classList;
    while (classList.length > 0) {
      classList.remove(classList.item(0)!);
    }
    document.documentElement.classList.add(this.theme());
  })
  //#endregion Theme

  //#region FullScreen
  elem:any;
  document:any;

  isFullScreen = signal(false);
  fullScreenLeftCount = signal(0);
  updateFullScreenLeftCount(){
    this.fullScreenLeftCount.update(curr => curr+1);
    console.log(this.fullScreenLeftCount());
  }
  toggleFullscreen(element?: HTMLElement) {
    if (this.isFullScreen()) {
      this.closeFullscreen();
    } else {
      this.openFullscreen();
    }
  }
  openFullscreen() {
    if(!this.elem){
      return;
    }
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

  /* Close fullscreen */
  closeFullscreen() {
    if(!this.document){
      return;
    }
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }
  //#endregion FullScreen


}
