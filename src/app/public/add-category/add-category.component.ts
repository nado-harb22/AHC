import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AllService } from '../../shared/services/all.service';
import { AuthService } from '../../shared/services/auth.service';
import { LanguageService } from '../../shared/services/language.service';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  myForm: FormGroup;
  // fileName: string = '';
  currentLang: string = 'en';
  constructor(private fb: FormBuilder, private lngService: LanguageService, private auth: AuthService, private router: Router, private allServices: AllService) {
    this.myForm = this.fb.group({
      title: ['', Validators.required],
      arabic_title: ['', Validators.required],
      // file: [null],
    });
  }

  ngOnInit(): void {
    if (!this.auth.isAdmin()) {
      this.router.navigate(['/home'])
    }
    this.currentLang = this.lngService.getCurrentLanguage();
  }

  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   this.myForm.patchValue({
  //     file: file
  //   });
  //   this.fileName = file.Title ? file.Title : 'test.txt';

  // }
  onFileChange(event: any) {

  }
  onSubmit() {
    if (this.myForm.valid) {
      const formData = {
        title: this.myForm.get('title')?.value,
        arabic_Title: this.myForm.get('arabic_title')?.value,
      };
      this.allServices.addCategory(formData);
      this.router.navigate(['/categories']);
    }


  }

}
