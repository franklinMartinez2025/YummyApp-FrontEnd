import type { Response } from "./response";

export interface PagedResponse<T> extends Response<T>{

  pageIndex: number,

  totalPages: number,

  totalItems: number,

  maxPageLink: number,

  pageItemsStartsAt: number,

  pageItemsEndsAt: number,

  hasPreviousPage: boolean,

  hasNextPage: boolean,

  items: T[]

}