import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {NavigationEnd, Router} from '@angular/router';
import {themeColors} from './core/constants/theme-colors';
import {Color} from './core/enums/colors.enum';

@Component({
  selector: 'app-home',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  themeColorList = themeColors;
  themeColorEnum = Color;
  themeColorInit: string = Color.RED;

  private isBrowser: boolean = isPlatformBrowser(this.platformId);

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      if (this.isBrowser) {
        window.scrollTo(0, 0);
      }
    });
  }

  changeColorTheme(color: string): void {
    this.themeColorInit = color;
  }

  checkSelectedTheme(color: string) {
    return this.themeColorInit === color;
  }

}
