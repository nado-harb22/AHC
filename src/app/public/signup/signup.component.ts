import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { FormsModule } from '@angular/forms';
import { AllService } from '../../shared/services/all.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private authService: AuthService, private allService: AllService,
    private router: Router
  ) {
    console.log(authService);
  }
  model: any = {};
  onSubmit() {
    this.authService.signUp(this.model.username, this.model.password).then(res => {
      if (res) {
        const uid = res.user.uid;
        const userData = {
          email: this.model.username,
          phone: this.model.phone,
          userId: uid,
          isAdmin: false,
          country: this.model.country
        };

        this.allService.addUser(userData);
        this.sendEmail(userData);
        this.router.navigate(['/login']);
      }
    }).catch(err => {
      if (err.code === 'auth/email-already-in-use') {
        alert('This email is already registered. Please log in instead.');
        this.router.navigate(['/login']);
      } else {
        alert('Registration failed: ' + err.message);
      }
    });

    console.log('Form Submitted!', this.model);
  }

  sendEmail(data: any) {
    const payload = {
      to_email: 'akkarHuntingClub@gmail.com',  // destination
      // to_email: 'nado.harb.w@gmail.com',
      from_email: data.email,        // sender (Firebase user)
      subject: 'New Registration',
      name: data.name,
      message: 'New Account Registered with email : ' + data.email + '\n' + 'Phone: ' + data.phone + '\n' + 'Country: ' + data.country
    };
    console.log(payload)
    this.allService.sendEmail(payload)
      .then(() => alert('Registration Completed!'))
      .catch(err => {
        console.error('Email sending error:', err);
        alert('Failed to send email.');
      });
  }
}
