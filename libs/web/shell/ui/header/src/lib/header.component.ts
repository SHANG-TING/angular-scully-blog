import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';

import { BehaviorSubject, fromEvent, of, take } from 'rxjs';
import { distinctUntilChanged, filter, map, pairwise, startWith, switchMap } from 'rxjs/operators';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import {
  actionSettingsChangeTheme,
  selectEffectiveTheme,
  selectSettingsStickyHeader,
} from '@web/settings/data-access';

const HEADER_HEIGHT = 65;

@UntilDestroy()
@Component({
  selector: 'asb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'block h-[72px]',
  },
})
export class HeaderComponent implements OnInit {
  menuShow$ = new BehaviorSubject(false);
  stickyHeaderStatus$ = this.store.select(selectSettingsStickyHeader);
  isStickyHeader$ = this.stickyHeaderStatus$.pipe(
    switchMap((state) => {
      if (state === 'always') return of(true);
      if (state === 'never') return of(false);
      return fromEvent(window, 'scroll').pipe(
        map(() => window.scrollY),
        filter((scrollY) => scrollY > HEADER_HEIGHT),
        pairwise(),
        map(([prevScrollY, currScrollY]) => currScrollY - prevScrollY),
        map((deltaScrollY) => deltaScrollY < 0),
        distinctUntilChanged(),
        startWith(true)
      );
    })
  );
  theme$ = this.store.select(selectEffectiveTheme);

  navLinks = [
    { href: '/posts', title: '文章' },
    { href: '/tags', title: '標籤' },
    { href: '/projects', title: '作品' },
    { href: '/about', title: '關於我' },
  ];

  constructor(private store: Store, private renderer: Renderer2) {}

  ngOnInit() {
    this.menuShow$
      .asObservable()
      .pipe(untilDestroyed(this))
      .subscribe((menuShow) => {
        if (menuShow) {
          this.renderer.addClass(document.body, 'overflow-hidden');
        } else {
          this.renderer.removeClass(document.body, 'overflow-hidden');
        }
      });
  }

  toggleMenu() {
    this.menuShow$.next(!this.menuShow$.value);
  }

  toggleTheme() {
    this.theme$.pipe(take(1)).subscribe((currTheme) => {
      this.store.dispatch(
        actionSettingsChangeTheme({
          theme: currTheme === 'dark' ? 'light' : 'dark',
        })
      );
    });
  }
}
