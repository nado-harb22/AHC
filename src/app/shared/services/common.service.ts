import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
   private platformId = inject(PLATFORM_ID);
  getCookie(key: string): any {
    if (isPlatformBrowser(this.platformId)) {
      const match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'));
      if (match) {
        return match[2];
      }
      return null;
    }
  }
  constructor() { }
}
