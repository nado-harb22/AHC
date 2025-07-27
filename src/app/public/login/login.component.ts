import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-login',
  imports: [FormsModule,TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService,
    private router: Router
  ) {
    console.log(authService);
  }
  model: any = {};
  onSubmit() {
    this.authService.login(this.model.username, this.model.password).then(res => {
      console.log(res);
      if (res) {
        this.router.navigate(['/home']);
      }
    })
    console.log('Form Submitted!', this.model);
    // Add your login logic here
  }
}
