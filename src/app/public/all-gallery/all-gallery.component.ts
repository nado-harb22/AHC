import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { AllService } from '../../shared/services/all.service';

@Component({
  selector: 'app-all-gallery',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslateModule],
  templateUrl: './all-gallery.component.html',
  styleUrl: './all-gallery.component.css'
})
export class AllGalleryComponent {
  imageUrls: any[] = [];
  folderId!: string;
  all: any[] = [];
  constructor(private router: Router, private route: ActivatedRoute, private allService: AllService) { }

  ngOnInit() {
    this.folderId = this.route.snapshot.paramMap.get('id') || '';

    if (!this.folderId) {
      console.error('No folder ID found in URL');
      return;
    }

    const storage = getStorage();
    const folderRef = ref(storage, `${this.folderId}/`); // ✅ No leading slash, ensure trailing slash
    this.allService.getImagesByCategoryId(this.folderId).subscribe(res => {
      this.all = this.transformFirebaseData(res);
      this.imageUrls = this.all.filter(item => item.categoryId === this.folderId);
    });

    // listAll(folderRef)
    //   .then(result => {
    //     console.log('Items found:', result.items.length);
    //     result.items.forEach(itemRef => {
    //       getDownloadURL(itemRef).then(url => {
    //         this.imageUrls.push(url);
    //       });
    //     });
    //   })
    //   .catch(error => {
    //     console.error('Error listing images:', error);
    //   });

  }
  private transformFirebaseData(data: any): Array<{ categoryId: string, imageUrl: string }> {
    if (!data) return [];

    return Object.values(data).map((item: any) => ({
      categoryId: item.categoryId || '',
      imageUrl: item.imageUrl || '',

    }));
  }
}
