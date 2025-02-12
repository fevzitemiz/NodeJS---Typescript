import IBaseRepository from "./ibase.repository"
import { TitleDto } from "../../../domain/dtos/title-dtos"

export interface ITitleRepository extends IBaseRepository<TitleDto> {

}