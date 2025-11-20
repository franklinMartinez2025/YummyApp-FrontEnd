export interface Response<T> {

    succeeded: boolean;

    message: string | null;

    errors: string[];

    data: T | null;
}