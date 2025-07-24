import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-membership',
  imports: [],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.css'
})
export class MembershipComponent {
  constructor(private router: Router) {

  }
  getStartd() {
    this.router.navigate(['/signup']);
  }
}
