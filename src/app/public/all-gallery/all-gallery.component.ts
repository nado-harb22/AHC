import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

@Component({
  selector: 'app-all-gallery',
  imports: [RouterModule,CommonModule,TranslateModule],
  templateUrl: './all-gallery.component.html',
  styleUrl: './all-gallery.component.css'
})
export class AllGalleryComponent {
 constructor(private router: Router) { }
    imageUrls: string[] = [];

  ngOnInit() {
    const storage = getStorage();
    const folderRef = ref(storage, 'gallery/'); // Replace with your folder path

    listAll(folderRef)
      .then((result) => {
        result.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((url) => {
            this.imageUrls.push(url);
          });
        });
      })
      .catch((error) => {
        console.error('Error listing images:', error);
      });
  }

  
}
