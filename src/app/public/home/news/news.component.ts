import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AllService } from '../../../shared/services/all.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-news',
  standalone: true, // ✅ Needed for standalone component
  imports: [RouterModule,CommonModule,TranslateModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  formattedNews: Array<{ title: string, desc: string, date: string, file: string }> = [];

  constructor(private allService: AllService, private router: Router) { }

  ngOnInit(): void {
    this.allService.fetchPosts().subscribe(data => {
      this.formattedNews = this.transformFirebaseData(data);
    });
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
  allNews() {
    this.router.navigate(['all-news']);
  }
}
