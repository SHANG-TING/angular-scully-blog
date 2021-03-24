import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, skip } from 'rxjs/operators';

import { PaginatedList } from '@web/shared/data-access/models';
import { TagStore } from '@web/tag/data-access';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'asb-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TagStore],
})
export class TagComponent implements OnInit {
  searchText$ = new BehaviorSubject<string>('');
  page$ = new BehaviorSubject<Pick<PaginatedList, 'pageIndex' | 'pageSize'>>({
    pageIndex: 0,
    pageSize: 5,
  });

  tagName$ = this.store.tagNameParams$;
  paginatedPosts$ = this.store.paginatedPosts$;

  constructor(private store: TagStore) {}

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
        this.store.loadPosts({ keyword, pageIndex, pageSize });
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
