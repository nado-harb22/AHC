import { Component } from '@angular/core';
import { AboutComponent } from "./about/about.component";
import { NewsComponent } from "./news/news.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [AboutComponent, NewsComponent,CommonModule, GalleryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 constructor(private router: Router,public auth :AuthService) { }
  gotoLink(link: string) {
    this.router.navigate([link]);
  }
}
