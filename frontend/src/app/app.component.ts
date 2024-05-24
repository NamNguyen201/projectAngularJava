import { Component, OnInit } from '@angular/core';
import { LoginService } from '@auth/services/login.service';
import { IconService } from './core/services/icon/icon.service';
import { LocalizationService } from './core/services/localization/localization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  opened=false;
  public title = 'FE';
  public constructor(
    private icon: IconService,
    private localizationService: LocalizationService,
    public loginService: LoginService,
    private router: Router//kiểm tra phải trang login hay không nếu phải thì ko hiển thị toolbar menu
  ) { }

  public ngOnInit(): void {
    this.icon.init();
    this.localizationService.init();
  }

  /* kiểm tra phải trang login hay không */
  public isLoginPage(): boolean {
    return this.router.url.includes('/logins')
  }
}
