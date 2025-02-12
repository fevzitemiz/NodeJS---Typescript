import { Result } from "../../../domain/extensions/result-wrapper"

export default interface IBaseRepository<T> {
    findById(id: string): Promise<Result<T>>;
    findAll(): Promise<Result<T[]>>;
    create(data: T): Promise<Result<T>>;
    update(data: T): Promise<Result<T>>;
    delete(id: string): Promise<Result<boolean>>;
}