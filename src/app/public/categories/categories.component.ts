import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LangChangeEvent, TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AllService } from '../../shared/services/all.service';
import { LanguageService } from '../../shared/services/language.service';

@Component({
  selector: 'app-categories',
  imports: [RouterModule, CommonModule, TranslateModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  formattedNews: Array<{ id:string,title: string, arabic_title: string }> = [];
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
      this.allService.fetchCategories().subscribe(data => {
        console.log(data)
        this.formattedNews = this.transformFirebaseData(data);
        console.log(this.formattedNews)
      });

    }
  }

  ngOnDestroy() {
    this.langChangeSub?.unsubscribe();
  }

  private transformFirebaseData(data: any): Array<{ id: string, title: string, arabic_title: string }> {
    if (!data) return [];

    return Object.entries(data).map(([id, item]: [string, any]) => ({
      id: id,
      title: item.title || '',
      arabic_title: item.arabic_Title || ''
    }));
  }


}
