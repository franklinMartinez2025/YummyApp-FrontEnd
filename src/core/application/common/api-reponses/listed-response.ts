import type { Response } from "./response"

export interface ListedResponse<T> extends Response<T> {

    items:T[]

}