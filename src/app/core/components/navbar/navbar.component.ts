import {Component, EventEmitter, HostListener, Output} from '@angular/core';
import {themeColors} from '../../constants/theme-colors';
import {Color} from '../../enums/colors.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Output() changeColorTheme: EventEmitter<string> = new EventEmitter();

  themeColorList = themeColors;
  themeColorInit: string = Color.RED;

  isScrolled = false;

  @HostListener('window:scroll')
  scrollEvent() {
    this.isScrolled = window.scrollY >= 30;
  }

  constructor() {}

  setColorTheme(color: string) {
    this.themeColorInit = color;
    this.changeColorTheme.emit(color);
  }

}
