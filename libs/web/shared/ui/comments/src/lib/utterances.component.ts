import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { selectEffectiveTheme } from '@web/settings/data-access';

@UntilDestroy()
@Component({
  selector: 'asb-utterances',
  template: `
    <div class="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300">
      <button *ngIf="(isLoaded$ | async) === false" (click)="loadComments()">載入留言</button>
      <div #commentsContainer className="utterances-frame relative"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UtterancesComponent implements AfterViewInit {
  @ViewChild('commentsContainer', { static: true }) commentsContainer!: ElementRef<HTMLElement>;

  isLoaded$ = new BehaviorSubject(false);

  constructor(private store: Store) {}

  ngAfterViewInit(): void {
    combineLatest([this.isLoaded$, this.store.select(selectEffectiveTheme)])
      .pipe(
        filter(([isLoaded]) => isLoaded),
        untilDestroyed(this)
      )
      .subscribe(([, theme]) => {
        const utterancesScript = document.createElement('script');
        utterancesScript.type = 'text/javascript';
        utterancesScript.async = true;
        utterancesScript.src = 'https://utteranc.es/client.js';
        utterancesScript.setAttribute('repo', 'SHANG-TING/angular-scully-blog');
        utterancesScript.setAttribute('issue-term', 'pathname');
        utterancesScript.setAttribute('label', 'comment');
        utterancesScript.setAttribute('theme', theme === 'dark' ? 'github-dark' : 'github-light');
        utterancesScript.setAttribute('crossorigin', 'anonymous');
        utterancesScript.setAttribute('async', 'async');
        utterancesScript.setAttribute('id', 'utterances-script');

        const { nativeElement } = this.commentsContainer;
        nativeElement.innerHTML = '';
        nativeElement.appendChild(utterancesScript);
      });
  }

  loadComments() {
    this.isLoaded$.next(true);
  }
}
