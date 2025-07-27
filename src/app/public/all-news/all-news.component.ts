import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AllService } from '../../shared/services/all.service';
import { CommonModule } from '@angular/common';
import { LangChangeEvent, TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../shared/services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-news',
  standalone: true, // ✅ Needed for standalone component
  imports: [RouterModule, CommonModule, TranslateModule],
  templateUrl: './all-news.component.html',
  styleUrl: './all-news.component.css'
})
export class AllNewsComponent  implements AfterViewInit, OnDestroy{
  formattedNews: Array<{ title: string, desc: string, date: string, file: string }> = [];
  currentLang: string = ''
  private langChangeSub: Subscription | undefined;

  constructor(private allService: AllService, private lngService: LanguageService) { }
  ngAfterViewInit() {
    this.currentLang = this.lngService.getCurrentLanguage();
    this.loadNewsByLang(this.currentLang);

    // Subscribe to language change event
    this.langChangeSub = this.lngService.onLangChange$.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang;
      this.loadNewsByLang(this.currentLang);
    });
  }

  loadNewsByLang(lang: string) {
    if (lang === 'en') {
      this.allService.fetchPosts().subscribe(data => {
        this.formattedNews = this.transformFirebaseData(data);
      });
    } else {
      this.allService.fetchPostsAr().subscribe(data => {
        this.formattedNews = this.transformFirebaseData(data);
      });
    }
  }

  ngOnDestroy() {
    this.langChangeSub?.unsubscribe();
  }

  private transformFirebaseData(data: any): Array<{ title: string, desc: string, date: string, file: string }> {
    if (!data) return [];

    return Object.values(data).map((item: any) => ({
      title: item.title || '',
      desc: item.description || '',
      date: item.date || '',
      file: item.file || ''
    }));
  }
}
