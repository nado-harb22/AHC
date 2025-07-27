import { Component, OnInit, ɵɵstylePropInterpolate7 } from '@angular/core';
import { AllService } from '../../../shared/services/all.service';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
  standalone: true,
  imports:[FormsModule,TranslateModule]
})
export class ContactUsComponent implements OnInit {
  emailData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor(private emailService: AllService) {}

  ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.emailData.email = user.email || '';
      }
    });
  }

  sendEmail() {
    const payload = {
      to_email: 'nado.harb.w@gmail.com',  // destination
      from_email: this.emailData.email,        // sender (Firebase user)
      subject: this.emailData.subject,
      name: this.emailData.name,
      message: this.emailData.message
    };
    console.log(payload)
    this.emailService.sendEmail(payload)
      .then(() => alert('Email sent successfully!'))
      .catch(err => {
        console.error('Email sending error:', err);
        alert('Failed to send email.');
      });
  }
}
