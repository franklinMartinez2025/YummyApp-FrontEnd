export type Nullable<T> = T | null;

export type ApiStatus = "idle" | "loading" | "success" | "error";

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface BaseOption {
  label: string;
  value: string | number;
}
