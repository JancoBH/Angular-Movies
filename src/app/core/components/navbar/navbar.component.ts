import {Component, EventEmitter, HostListener, Output} from '@angular/core';
import {themeColors} from '../../constants/theme-colors';
import {Color} from '../../enums/colors.enum';
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    MatMenuModule,
    MatButtonModule,
    RouterLinkActive,
    NgOptimizedImage,
    RouterLink,
    MatIconModule,
    NgForOf
  ],
  standalone: true
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
