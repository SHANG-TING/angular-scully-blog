export interface PaginatedList<T = unknown> {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  totalCount: number;
  data: Array<T>;
}
