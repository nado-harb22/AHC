import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
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

  allItems() {
    this.router.navigate(['/all-gallery']);
  }
}
