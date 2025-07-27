import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { FormsModule } from '@angular/forms';
import { AllService } from '../../shared/services/all.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, TranslateModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  countries = [
    { code: 'AF' }, { code: 'AL' }, { code: 'DZ' }, { code: 'AS' }, { code: 'AD' },
    { code: 'AO' }, { code: 'AI' }, { code: 'AQ' }, { code: 'AG' }, { code: 'AR' },
    { code: 'AM' }, { code: 'AW' }, { code: 'AU' }, { code: 'AT' }, { code: 'AZ' },
    { code: 'BS' }, { code: 'BH' }, { code: 'BD' }, { code: 'BB' }, { code: 'BY' },
    { code: 'BE' }, { code: 'BZ' }, { code: 'BJ' }, { code: 'BM' }, { code: 'BT' },
    { code: 'BO' }, { code: 'BQ' }, { code: 'BA' }, { code: 'BW' }, { code: 'BV' },
    { code: 'BR' }, { code: 'IO' }, { code: 'BN' }, { code: 'BG' }, { code: 'BF' },
    { code: 'BI' }, { code: 'CV' }, { code: 'KH' }, { code: 'CM' }, { code: 'CA' },
    { code: 'KY' }, { code: 'CF' }, { code: 'TD' }, { code: 'CL' }, { code: 'CN' },
    { code: 'CX' }, { code: 'CC' }, { code: 'CO' }, { code: 'KM' }, { code: 'CD' },
    { code: 'CG' }, { code: 'CK' }, { code: 'CR' }, { code: 'HR' }, { code: 'CU' },
    { code: 'CW' }, { code: 'CY' }, { code: 'CZ' }, { code: 'DK' }, { code: 'DJ' },
    { code: 'DM' }, { code: 'DO' }, { code: 'EC' }, { code: 'EG' }, { code: 'SV' },
    { code: 'GQ' }, { code: 'ER' }, { code: 'EE' }, { code: 'SZ' }, { code: 'ET' },
    { code: 'FK' }, { code: 'FO' }, { code: 'FJ' }, { code: 'FI' }, { code: 'FR' },
    { code: 'GF' }, { code: 'PF' }, { code: 'TF' }, { code: 'GA' }, { code: 'GM' },
    { code: 'GE' }, { code: 'DE' }, { code: 'GH' }, { code: 'GI' }, { code: 'GR' },
    { code: 'GL' }, { code: 'GD' }, { code: 'GP' }, { code: 'GU' }, { code: 'GT' },
    { code: 'GG' }, { code: 'GN' }, { code: 'GW' }, { code: 'GY' }, { code: 'HT' },
    { code: 'HM' }, { code: 'VA' }, { code: 'HN' }, { code: 'HK' }, { code: 'HU' },
    { code: 'IS' }, { code: 'IN' }, { code: 'ID' }, { code: 'IR' }, { code: 'IQ' },
    { code: 'IE' }, { code: 'IM' }, { code: 'IL' }, { code: 'IT' }, { code: 'JM' },
    { code: 'JP' }, { code: 'JE' }, { code: 'JO' }, { code: 'KZ' }, { code: 'KE' },
    { code: 'KI' }, { code: 'KP' }, { code: 'KR' }, { code: 'KW' }, { code: 'KG' },
    { code: 'LA' }, { code: 'LV' }, { code: 'LB' }, { code: 'LS' }, { code: 'LR' },
    { code: 'LY' }, { code: 'LI' }, { code: 'LT' }, { code: 'LU' }, { code: 'MO' },
    { code: 'MG' }, { code: 'MW' }, { code: 'MY' }, { code: 'MV' }, { code: 'ML' },
    { code: 'MT' }, { code: 'MH' }, { code: 'MQ' }, { code: 'MR' }, { code: 'MU' },
    { code: 'YT' }, { code: 'MX' }, { code: 'FM' }, { code: 'MD' }, { code: 'MC' },
    { code: 'MN' }, { code: 'ME' }, { code: 'MS' }, { code: 'MA' }, { code: 'MZ' },
    { code: 'MM' }, { code: 'NA' }, { code: 'NR' }, { code: 'NP' }, { code: 'NL' },
    { code: 'NC' }, { code: 'NZ' }, { code: 'NI' }, { code: 'NE' }, { code: 'NG' },
    { code: 'NU' }, { code: 'NF' }, { code: 'MP' }, { code: 'NO' }, { code: 'OM' },
    { code: 'PK' }, { code: 'PW' }, { code: 'PS' }, { code: 'PA' }, { code: 'PG' },
    { code: 'PY' }, { code: 'PE' }, { code: 'PH' }, { code: 'PN' }, { code: 'PL' },
    { code: 'PT' }, { code: 'PR' }, { code: 'QA' }, { code: 'RE' }, { code: 'RO' },
    { code: 'RU' }, { code: 'RW' }, { code: 'BL' }, { code: 'SH' }, { code: 'KN' },
    { code: 'LC' }, { code: 'MF' }, { code: 'SX' }, { code: 'PM' }, { code: 'VC' },
    { code: 'WS' }, { code: 'SM' }, { code: 'ST' }, { code: 'SA' }, { code: 'SN' },
    { code: 'RS' }, { code: 'SC' }, { code: 'SL' }, { code: 'SG' }, { code: 'SK' },
    { code: 'SI' }, { code: 'SB' }, { code: 'SO' }, { code: 'ZA' }, { code: 'GS' },
    { code: 'SS' }, { code: 'ES' }, { code: 'LK' }, { code: 'SD' }, { code: 'SR' },
    { code: 'SJ' }, { code: 'SE' }, { code: 'CH' }, { code: 'SY' }, { code: 'TW' },
    { code: 'TJ' }, { code: 'TZ' }, { code: 'TH' }, { code: 'TL' }, { code: 'TG' },
    { code: 'TK' }, { code: 'TO' }, { code: 'TT' }, { code: 'TN' }, { code: 'TR' },
    { code: 'TM' }, { code: 'TC' }, { code: 'TV' }, { code: 'UG' }, { code: 'UA' },
    { code: 'AE' }, { code: 'GB' }, { code: 'US' }, { code: 'UY' }, { code: 'UZ' },
    { code: 'VU' }, { code: 'VE' }, { code: 'VN' }, { code: 'WF' }, { code: 'EH' },
    { code: 'YE' }, { code: 'ZM' }, { code: 'ZW' }
  ];

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
