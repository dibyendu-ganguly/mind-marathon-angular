import { Directive, HostListener, Output, EventEmitter, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appFullScreenModeListener]',
  exportAs : 'fullScreen',
  standalone: true
})
export class FullScreenModeListenerDirective {

  constructor(@Inject(DOCUMENT) private document: any) { }
  @Output() fullscreenchange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:msfullscreenchange', ['$event'])
  onFullscreenChange(_event: any) {
    console.log(event);
    // this.fullscreenchange.emit(this.isFullscreen());
  }

  isFullscreen(): boolean {
    return !!(document.fullscreenElement || this.document.webkitFullscreenElement || this.document.mozFullScreenElement || this.document.msFullscreenElement);
  }

}
