import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: 'img[appImgMissingDirective]',
  standalone: true
})
export class ImgMissingDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('error')
  private onError() {
    this.renderer.removeAttribute(this.el.nativeElement, 'srcset');
    this.renderer.setAttribute(this.el.nativeElement, 'src', './assets/img/fallback.webp');
  }
}
