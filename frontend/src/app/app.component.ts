/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService,
              private translate: TranslateService) {

    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('fr');

    const  browserLang= translate.getBrowserLang();
    translate.use(browserLang.match(/fr|en/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.analytics.trackPageViews();
  }
}
