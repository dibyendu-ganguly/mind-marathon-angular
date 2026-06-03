import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

export const STORAGE_TYPE : 'localStorage' | 'sessionStorage' = 'localStorage';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(@Inject(DOCUMENT) private document: Document) { }
  private readonly storage = this.document.defaultView?.[STORAGE_TYPE];

  setItem(key: string, value: string): void {

    if (this.storage) {
      this.storage.setItem(key, value);
    }
  }

  getItem(key: string): string | null {
    if (this.storage) {
      const item = this.storage.getItem(key);

      if (item) {
        return item;
      }
    }
    return null;
  }

  removeItem(key: string): void {
     if (this.storage) {
      const item = this.storage.getItem(key);

      if (item) {
        this.storage.removeItem(key);
      }
    }
  }


}
