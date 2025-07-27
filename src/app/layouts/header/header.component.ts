import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../shared/services/language.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showMobileMenu = false;
  currentLang: string = 'en';
  constructor(private router: Router,
    private languageService: LanguageService, public auth: AuthService, public translate: TranslateService) { }
  openLoginModal() {
    this.router.navigate(['/login']);
    // this.translate.addLangs(['en', 'ar']);
    // this.translate.setDefaultLang('en');

    // const browserLang = this.translate.getBrowserLang();
    // this.translate.use(browserLang?.match(/en|ar/) ? browserLang : 'en');
  }
  toggleLanguage() {
    const newLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.languageService.changeLanguage(newLang);
    this.currentLang = newLang;
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}
