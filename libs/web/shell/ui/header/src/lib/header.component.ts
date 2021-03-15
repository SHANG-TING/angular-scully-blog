import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'asb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class:
      'py-2 md:py-8 sticky top-n-1 z-50 transition-all backdrop mx-auto border-b border-b-0 border-slate-900/10 dark:border-slate-300/10 mb-16 w-full',
  },
})
export class HeaderComponent implements OnInit {
  get theme() {
    return this._theme;
  }
  set theme(value) {
    this._theme = value;
    if (this._theme === 'dark') {
      this._renderer.addClass(document.body.parentElement, 'dark');
      this._renderer.setStyle(
        document.body.parentElement,
        'color-scheme',
        'dark'
      );
    } else {
      this._renderer.removeClass(document.body.parentElement, 'dark');
      this._renderer.removeStyle(document.body.parentElement, 'color-scheme');
    }
  }
  private _theme: 'light' | 'dark' = 'light';

  constructor(private _renderer: Renderer2) {}

  ngOnInit(): void {
    this._detectPrefersColorScheme();
  }

  private _detectPrefersColorScheme() {
    // Detect if prefers-color-scheme is supported
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      // Set colorScheme to Dark if prefers-color-scheme is dark. Otherwise, set it to Light.
      this.theme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    } else {
      // If the browser does not support prefers-color-scheme, set the default to dark.
      this.theme = 'dark';
    }
  }
}
