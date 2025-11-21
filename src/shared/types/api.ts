export interface Response<T> {
  succeeded: boolean;

  message: string | null;

  errors: string[];

  data?: T | null;
}

export interface ListedResponse<T> extends Response<T> {
  items: T[];
}

export interface PagedResponse<T> extends Response<T> {
  pageIndex: number;

  totalPages: number;

  totalItems: number;

  maxPageLink: number;

  pageItemsStartsAt: number;

  pageItemsEndsAt: number;

  hasPreviousPage: boolean;

  hasNextPage: boolean;

  items: T[];
}
