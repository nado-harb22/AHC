import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AllService } from '../../shared/services/all.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-news',
  standalone: true, // ✅ Needed for standalone component
  imports: [RouterModule,CommonModule],
  templateUrl: './all-news.component.html',
  styleUrl: './all-news.component.css'
})
export class AllNewsComponent {
  formattedNews: Array<{ title: string, desc: string, date: string, file: string }> = [];

  constructor(private allService: AllService) {}

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
}
