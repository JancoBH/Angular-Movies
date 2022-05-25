import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  socialData = [
    {url: 'https://twitter.com/JancoBH', name: 'Twitter', img: './assets/svg/twitter.svg'},
    {url: 'https://github.com/JancoBH', name: 'Github', img: './assets/svg/github.svg'}
  ];

  constructor() { }
}
