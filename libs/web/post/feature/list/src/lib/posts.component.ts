import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';

import {
  BehaviorSubject,
  combineLatest,
} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  skip,
} from 'rxjs/operators';

import {
  UntilDestroy,
  untilDestroyed,
} from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import {
  loadPosts,
  selectPaginatedPosts,
} from '@web/post/data-access';
import { PaginatedList } from '@web/shared/data-access/models';

@UntilDestroy()
@Component({
  selector: 'asb-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit {
  searchText$ = new BehaviorSubject<string>('');
  page$ = new BehaviorSubject<Pick<PaginatedList, 'pageIndex' | 'pageSize'>>({
    pageIndex: 0,
    pageSize: 5,
  });
  paginatedPosts$ = this.store.select(selectPaginatedPosts);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.searchText$.pipe(skip(1), untilDestroyed(this)).subscribe(() => {
      this.page$.next({
        ...this.page$.value,
        pageIndex: 0,
      });
    });

    combineLatest([this.searchText$, this.page$])
      .pipe(
        debounceTime(200),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        ),
        untilDestroyed(this)
      )
      .subscribe(([keyword, { pageIndex, pageSize }]) => {
        this.store.dispatch(loadPosts({ keyword, pageIndex, pageSize }));
      });
  }

  nextPage() {
    this.page$.next({
      ...this.page$.value,
      pageIndex: this.page$.value.pageIndex + 1,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  prevPage() {
    this.page$.next({
      ...this.page$.value,
      pageIndex: this.page$.value.pageIndex - 1,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
