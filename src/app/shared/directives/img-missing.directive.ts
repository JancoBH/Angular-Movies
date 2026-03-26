import { Directive, ElementRef, HostListener, Renderer2, inject } from '@angular/core';

@Directive({
  selector: 'img[appImgMissingDirective]',
  standalone: true
})
export class ImgMissingDirective {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);


  @HostListener('error')
  onError() {
    this.renderer.removeAttribute(this.el.nativeElement, 'srcset');
    this.renderer.setAttribute(this.el.nativeElement, 'src', './assets/img/fallback.webp');
  }
}
