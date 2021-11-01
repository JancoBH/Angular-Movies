import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  socialData = [
    {url: 'https://twitter.com/JancoBH', name: 'Twitter', img: 'https://raw.githubusercontent.com/edent/SuperTinyIcons/8a805e39049f04d22efe1eed8139d61c5e9a24cc/images/svg/twitter.svg'},
    {url: 'https://github.com/JancoBH', name: 'Github', img: 'https://raw.githubusercontent.com/edent/SuperTinyIcons/8a805e39049f04d22efe1eed8139d61c5e9a24cc/images/svg/github.svg'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
