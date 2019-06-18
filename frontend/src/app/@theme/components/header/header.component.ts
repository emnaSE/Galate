import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import {AuthService} from "../../../pages/auth/auth.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';
  username:"";
  user: any;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private loginService:AuthService,
              private router:Router,
              private translate:TranslateService) {
   // translateService.addLangs(['fr','en']);
    //translateService.setDefaultLang('fr');

    const  browserLang= translate.getBrowserLang();
    translate.use(browserLang.match(/fr|en/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }


   logout(){
      this.loginService.logout();
      this.router.navigate(['auth/login']);
   }

}
