import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
showMobileMenu = false;

  constructor(private router: Router,public auth :AuthService) { }
  openLoginModal() {
    this.router.navigate(['/login']);
  }
  logout(){
    this.auth.logout();
     this.router.navigate(['/home']);
  }
}
