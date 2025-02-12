export interface Result<T> {
    status: boolean,
    data?: T | null,
    errorDescription: any | null
}

export function ResultWrapper<T>(status = false, data: T | null, errorDescription: any | null) {
    let result: Result<T> = {
        data,
        errorDescription,
        status
    }
    return result
}