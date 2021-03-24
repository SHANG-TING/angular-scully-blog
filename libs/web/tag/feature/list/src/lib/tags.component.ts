import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';

import { Store } from '@ngrx/store';
import {
  loadTags,
  selectTagsData,
} from '@web/tag/data-access';

@Component({
  selector: 'asb-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsComponent implements OnInit {
  tags$ = this.store.select(selectTagsData);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadTags());
  }
}
