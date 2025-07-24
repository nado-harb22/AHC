import { Component } from '@angular/core';
import { AboutComponent } from "./about/about.component";
import { NewsComponent } from "./news/news.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [AboutComponent, NewsComponent, GalleryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {

  }
  gotoLink(link: string) {
    this.router.navigate([link]);
  }
}
