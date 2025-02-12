import Brand from "../../../domain/models/brand";
import { IBrandRepository } from '../abstract/ibrand-repository';
import { ResultWrapper, Result } from "../../../domain/extensions/result-wrapper"
import { BrandCreateDto, BrandDto, BrandUpdateDto } from "../../../domain/dtos/brand-dtos"
import RedisService from "./redis-cache"

export default class BrandRepository implements IBrandRepository {

    private redisService: RedisService;

    constructor(_redisClient: any) {
        this.redisService = new RedisService(_redisClient)
    }

    async findAll(): Promise<Result<BrandDto[]>> {
        try {
            let cache = await this.redisService.getCache("brands")
            console.log(cache)
            if (cache != null)
                return this.redisService.getCache("brands")

            let brands = await Brand.findAll({
                attributes: ["id", "description"]
            })
            let result: BrandDto[] = brands

            this.redisService.setCache("brands", JSON.stringify(ResultWrapper<BrandDto[]>(true, result, null), null, 8))

            return ResultWrapper<BrandDto[]>(true, result, null);
        } catch (error) {
            return ResultWrapper<BrandDto[]>(false, null, error)
        }
    }

    async findById(id: string): Promise<Result<BrandDto>> {
        try {
            let user = await Brand.findByPk(id)
            if (user === null)
                return ResultWrapper<BrandDto>(false, null, "Veri Bulunamadı!")

            return ResultWrapper<BrandDto>(true, user, null)
        } catch (error) {
            return ResultWrapper<BrandDto>(false, null, error)
        }
    }

    async create(payload: BrandCreateDto): Promise<Result<BrandDto>> {
        try {
            await this.redisService.removeCache("brands")
            let data = await Brand.create({
                description: payload.description
            })
            await data.save()
            return ResultWrapper<BrandDto>(true, data, null);
        } catch (error) {
            return ResultWrapper<BrandDto>(false, null, error)
        }
    }

    async update(payload: BrandUpdateDto): Promise<Result<BrandDto>> {
        try {
            await this.redisService.removeCache("brands")
            let currentData = await Brand.findByPk(payload.id)

            if (currentData === null)
                return ResultWrapper<BrandDto>(false, null, "Veri Bulunamadı!")

            currentData.description = payload.description
            await currentData.save()
            return ResultWrapper<BrandDto>(true, currentData, null);
        } catch (error) {
            return ResultWrapper<BrandDto>(false, null, error)
        }
    }

    async delete(id: string): Promise<Result<boolean>> {
        try {
            await this.redisService.removeCache("brands")
            let currentData = await Brand.destroy({
                where: {
                    id
                }
            })

            if (currentData === 0)
                return ResultWrapper<boolean>(false, null, "Silinecek Veri Bulunamadı!")

            return ResultWrapper<boolean>(true, true, null);
        } catch (error) {
            return ResultWrapper<boolean>(false, false, error)
        }
    }
}