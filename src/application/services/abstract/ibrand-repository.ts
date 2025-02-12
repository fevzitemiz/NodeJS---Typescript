import IBaseRepository from "./ibase.repository"
import { BrandDto } from "../../../domain/dtos/brand-dtos"

export interface IBrandRepository extends IBaseRepository<BrandDto> {

}