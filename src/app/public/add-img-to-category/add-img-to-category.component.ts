import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from '../../shared/services/all.service';
import { AuthService } from '../../shared/services/auth.service';
import { LanguageService } from '../../shared/services/language.service';
import { LangChangeEvent, TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-img-to-category',
  imports: [ReactiveFormsModule,CommonModule, TranslateModule],
  templateUrl: './add-img-to-category.component.html',
  styleUrl: './add-img-to-category.component.css',
  standalone: true, // ✅ Ensure standalone
  schemas:[NO_ERRORS_SCHEMA]
})
export class AddImgToCategoryComponent {
  formattedNews: Array<{ id: string, title: string, arabic_title: string }> = [];
  currentLang: string = '';
  private langChangeSub?: Subscription;
  myForm: FormGroup;
  fileName: string = '';
  selectedFile: File | null = null;

  constructor(
    private allService: AllService,
    private lngService: LanguageService,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.myForm = this.fb.group({
      categoryId: ['', Validators.required],
      file: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    if (!this.auth.isAdmin()) {
      this.router.navigate(['/home']);
    }
    this.currentLang = this.lngService.getCurrentLanguage();
    this.loadNewsByLang(this.currentLang);

    // Subscribe to language change
    this.langChangeSub = this.lngService.onLangChange$.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang;
      this.loadNewsByLang(this.currentLang);
    });
  }

  ngOnDestroy() {
    this.langChangeSub?.unsubscribe();
  }

  loadNewsByLang(lang: string) {
    this.allService.fetchCategories().subscribe(data => {
      this.formattedNews = this.transformFirebaseData(data);
    });
  }

  private transformFirebaseData(data: any): Array<{ id: string, title: string, arabic_title: string }> {
    if (!data) return [];
    return Object.entries(data).map(([id, item]: [string, any]) => ({
      id,
      title: item.title || '',
      arabic_title: item.arabic_Title || ''
    }));
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.myForm.patchValue({ file });
      this.fileName = file.name;
    }
  }

  onSubmit() {
    if (this.myForm.valid && this.selectedFile) {
      const categoryId = this.myForm.get('categoryId')?.value;
      this.allService.uploadFileOfCategory(categoryId, this.selectedFile).then((url: any) => {
        if (url) {
          console.log('File uploaded successfully! Download URL:', url);
          this.router.navigate(['/categories']);
        }
      });
    }
  }
}
