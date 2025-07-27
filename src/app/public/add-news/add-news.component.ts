import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AllService } from '../../shared/services/all.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-news',
  imports: [ReactiveFormsModule,TranslateModule],
  templateUrl: './add-news.component.html',
  styleUrl: './add-news.component.css'
})
export class AddNewsComponent {
  myForm: FormGroup;
  fileName: string = '';

  constructor(private fb: FormBuilder,private auth:AuthService,private router : Router, private allServices: AllService) {
    this.myForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      file: [null],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void { 
    if(!this.auth.isAdmin()){
      this.router.navigate(['/home'])
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.myForm.patchValue({
      file: file
    });
    this.fileName = file.Title ? file.Title : 'test.txt';
    if (file) {
      // this.allServices.uploadFile(file).subscribe((url: any) => {
      //   console.log('File uploaded successfully! Download URL:', url);
      // });
    }
  }
  onFileChange(event: any) {

  }
  onSubmit() {
    if (this.myForm.valid) {
      if (this.myForm.get('file')) {
        this.allServices.uploadFile(this.myForm.get('file')?.value).then((url: any) => {
          console.log('File uploaded successfully! Download URL:', url);
          if (url) {
            const formData = {
              title: this.myForm.get('title')?.value,
              description: this.myForm.get('description')?.value,
              file: url, // Just send file name or skip it
              date: this.myForm.get('date')?.value
            };

            this.allServices.addNews(formData);
            this.router.navigate(['/news']);
          }
        });
      }

    }
  }

}
