import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, NgClass} from '@angular/common';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {themeColors} from './core/constants/theme-colors';
import {Color} from './core/enums/colors.enum';
import {NavbarComponent} from "./core/components/navbar/navbar.component";
import {FooterComponent} from "./core/components/footer/footer.component";

@Component({
  selector: 'app-home',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NgClass],
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
