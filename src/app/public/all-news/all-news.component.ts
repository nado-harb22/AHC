import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AllService } from '../../shared/services/all.service';
import { CommonModule } from '@angular/common';
import { LangChangeEvent, TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../shared/services/language.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-all-news',
  standalone: true, // ✅ Needed for standalone component
  imports: [RouterModule, CommonModule, TranslateModule],
  templateUrl: './all-news.component.html',
  styleUrl: './all-news.component.css'
})
export class AllNewsComponent implements AfterViewInit, OnDestroy {
  formattedNews: Array<{ id: string, title: string, desc: string, date: string, file: string }> = [];
  currentLang: string = '';
  private langChangeSub: Subscription | undefined;
  isAdmin: boolean = false;
  constructor(private allService: AllService, private lngService: LanguageService, private auth: AuthService) { }
  ngAfterViewInit() {
    this.currentLang = this.lngService.getCurrentLanguage();
    this.loadNewsByLang(this.currentLang);
    //  if (!this.auth.isAdmin()) {
    this.isAdmin = this.auth.isAdmin()
    // }
    // Subscribe to language change event
    this.langChangeSub = this.lngService.onLangChange$.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang;
      this.loadNewsByLang(this.currentLang);
    });
  }
  deleteNews(id: string) {
    if (confirm('هل أنت متأكد أنك تريد حذف هذا الخبر؟')) {
      if (this.currentLang === 'en') {
        this.allService.deleteItem('news/', id).then(() => {
          alert('✅ تم الحذف بنجاح')
          this.loadNewsByLang(this.currentLang);
        }
        )
          .catch((error) => console.error('❌ خطأ:', error));
      } else {
        this.allService.deleteItem('news_ar/', id).then(() => {
          alert('✅ تم الحذف بنجاح')
          this.loadNewsByLang(this.currentLang);
        }
        )
          .catch((error) => console.error('❌ خطأ:', error));
      }
    }
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

  private transformFirebaseData(data: any): Array<{ id: string, title: string, desc: string, date: string, file: string }> {
    if (!data) return [];

    return Object.entries(data).map(([id, item]: [string, any]) => ({
      id: id,
      title: item.title || '',
      desc: item.description || '',
      date: item.date || '',
      file: item.file || ''
    }));
  }

}
