import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isScrolled = false;

  @HostListener('window:scroll')
  scrollEvent() {
    this.isScrolled = window.pageYOffset >= 50;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
