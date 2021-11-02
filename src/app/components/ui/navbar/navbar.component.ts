import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() changeColorTheme: EventEmitter<string> = new EventEmitter();

  colorThemeList = [
    {color: '#f44336', name: 'Red'},
    {color: '#2196f3', name: 'Blue'},
    {color: '#4caf50', name: 'Green'},
  ]

  selectedColor = '#f44336';

  isScrolled = false;

  @HostListener('window:scroll')
  scrollEvent() {
    this.isScrolled = window.pageYOffset >= 50;
  }

  constructor() { }

  ngOnInit(): void {
  }

  setColorTheme(color: string) {
    this.selectedColor = color;
    this.changeColorTheme.emit(color);
  }

}
