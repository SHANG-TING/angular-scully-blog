import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { asyncScheduler, filter, observeOn, startWith } from 'rxjs';
import Typed from 'typed.js';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

const typedOptions = {
  strings: [
    `I'm aliased as <b class="font-medium">Neil</b> at work.`,
    `I'm a full-stack developer.`,
    `I live in <b class="font-medium">Taipei, Taiwan</b>.`,
    `My first programming language I learned was <b class="font-medium">C#</b>.`,
    `I love web development.`,
    `I'm focusing on design enterprise frontend architecture base angular.`,
    `I work mostly with Angular/.NetCore and Azure Functions.`,
    `I'm a sport-guy. softball, biking.`,
    `I love rock music.`,
  ],
  typeSpeed: 40,
  loop: true,
};

@UntilDestroy()
@Component({
  selector: 'asb-summary',
  templateUrl: './summary.component.html',
})
export class SummaryComponent implements AfterViewInit {
  @ViewChild('typedElm') typedElmRef!: ElementRef<HTMLElement>;

  private typed?: Typed;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        observeOn(asyncScheduler),
        untilDestroyed(this),
        startWith(null)
      )
      .subscribe(() => {
        if (this.typed) {
          this.typed.destroy();
          delete this.typed;
        }

        if (this.isRoot) {
          this.typed = new Typed(this.typedElmRef.nativeElement, typedOptions);
          this.typed.start();
        }
      });
  }

  get isRoot() {
    return this.router.isActive('/', {
      paths: 'exact',
      matrixParams: 'ignored',
      queryParams: 'ignored',
      fragment: 'ignored',
    });
  }
}
