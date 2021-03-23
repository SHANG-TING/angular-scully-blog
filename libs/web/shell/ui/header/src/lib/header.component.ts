import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';

import { BehaviorSubject, take } from 'rxjs';

import { Store } from '@ngrx/store';
import {
  actionSettingsChangeTheme,
  selectEffectiveTheme,
  selectSettingsStickyHeader,
} from '@web/settings/data-access';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

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
  stickyHeader$ = this.store.select(selectSettingsStickyHeader);
  theme$ = this.store.select(selectEffectiveTheme);

  navLinks = [
    { href: '/posts', title: '文章' },
    { href: '/tags', title: '標籤' },
    { href: '/projects', title: '作品' },
    { href: '/about', title: '關於我' },
  ]

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
