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
        var uid = res?.user.uid;
        this.allService.addUser({ email: this.model.username, phone: this.model.phone, userId: uid, isAdmin: false, country: this.model.country });
        // this.allService.showDialog({ message: 'Registration Success' }).subscribe({});
        this.sendEmail({ email: this.model.username, phone: this.model.phone, userId: uid, isAdmin: false, country: this.model.country })
        this.router.navigate(['/login'])
      }

    })
    console.log('Form Submitted!', this.model);
    // Add your login logic here
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
