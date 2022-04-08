import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

import { distinctUntilChanged, fromEvent, map, startWith } from 'rxjs';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HEADER_HEIGHT } from '@web/shell/ui/header';

@UntilDestroy()
@Component({
  selector: 'asb-scroll-to-top-btn',
  templateUrl: './scroll-to-top-btn.component.html',
  styleUrls: ['./scroll-to-top-btn.component.scss'],
  host: {
    class: 'h-[60px] w-[60px] fixed bottom-10 right-4 xl:right-8 z-40 cursor-pointer',
    '(click)': 'scrollToTop()',
  },
})
export class ScrollToTopBtnComponent implements OnInit {
  constructor(private elementRef: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnInit() {
    fromEvent(window, 'scroll')
      .pipe(
        map(() => window.scrollY > HEADER_HEIGHT * 2),
        distinctUntilChanged(),
        startWith(false),
        untilDestroyed(this)
      )
      .subscribe((isVisible) => {
        const { nativeElement } = this.elementRef;
        if (!isVisible) {
          this.renderer.removeClass(nativeElement, 'transition-all');
          this.renderer.removeClass(nativeElement, 'duration-800');
          this.renderer.removeClass(nativeElement, 'ease-in-out');
          this.renderer.removeClass(nativeElement, 'scrolling');
        }
        this.renderer.setStyle(nativeElement, 'opacity', isVisible ? 1 : 0);
      });
  }

  scrollToTop() {
    const { nativeElement } = this.elementRef;
    this.renderer.addClass(nativeElement, 'transition-all');
    this.renderer.addClass(nativeElement, 'duration-800');
    this.renderer.addClass(nativeElement, 'ease-in-out');
    this.renderer.addClass(nativeElement, 'scrolling');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
