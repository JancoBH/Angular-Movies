import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  colorThemeList = [
    {color: '#f44336', name: 'Red'},
    {color: '#2196f3', name: 'Blue'},
    {color: '#4caf50', name: 'Green'},
  ]

  selectedColor = '#f44336';

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
    this.selectedColor = color;
  }

  checkSelectedTheme(color: string) {
    return this.selectedColor === color;
  }

}
