import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  setItem(key: string, value: string): void {
    const localStorage = this.document.defaultView?.localStorage;

    if (localStorage) {
      const item = localStorage.getItem(key);

      if (item) {
        localStorage.setItem(key, value);
      }
    }
  }

  getItem(key: string): string | null {
    const localStorage = this.document.defaultView?.localStorage;
    if (localStorage) {
      const item = localStorage.getItem(key);

      if (item) {
        return item;
      }
    }
    return null;
  }

  removeItem(key: string): void {
    const localStorage = this.document.defaultView?.localStorage;
     if (localStorage) {
      const item = localStorage.getItem(key);

      if (item) {
        localStorage.removeItem(key);
      }
    }
  }


}
