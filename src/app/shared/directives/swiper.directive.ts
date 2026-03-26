import { AfterViewInit, Directive, ElementRef, Input, inject } from '@angular/core';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';

@Directive({
  selector: '[appSwiper]',
  standalone: true
})
export class SwiperDirective implements AfterViewInit {
  private el = inject<ElementRef<SwiperContainer>>(ElementRef);

  @Input() config?: SwiperOptions;

  ngAfterViewInit(): void {
    Object.assign(this.el?.nativeElement, this.config);

    this.el.nativeElement.initialize();
  }
}
