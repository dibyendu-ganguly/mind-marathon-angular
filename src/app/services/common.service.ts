import { ElementRef, inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  scrollToElementByQuery(elementRef: ElementRef<any>, query: string): HTMLElement | undefined {
    const elements = elementRef.nativeElement.querySelectorAll(query);
    const firstElement = elements[0];

    if (!firstElement) {
      return;
    }

    firstElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
    return firstElement;
  }
}
