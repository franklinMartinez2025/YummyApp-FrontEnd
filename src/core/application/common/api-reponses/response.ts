export interface Response<T> {

    success: boolean;

    message: string | null;

    errors: string[];

    data: T | null;
}