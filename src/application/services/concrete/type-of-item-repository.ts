import TypeOfItem from "../../../domain/models/type-of-item";
import { ITypeOfItemRepository } from '../abstract/itype-of-item-repository';
import { ResultWrapper, Result } from "../../../domain/extensions/result-wrapper"
import { TypeOfItemCreateDto, TypeOfItemDto, TypeOfItemUpdateDto } from "../../../domain/dtos/type-of-item"
import RedisService from "./redis-cache"

export default class TypeOfItemRepository implements ITypeOfItemRepository {

    private redisService: RedisService;

    constructor(_redisClient: any) {
        this.redisService = new RedisService(_redisClient)
    }

    async findAll(): Promise<Result<TypeOfItemDto[]>> {
        try {
            let cache = await this.redisService.getCache("typesOfItems")
            console.log(cache)
            if (cache != null)
                return this.redisService.getCache("typesOfItems")

            let typeOfItems = await TypeOfItem.findAll({
                attributes: ["id", "description"]
            })
            let result: TypeOfItemDto[] = typeOfItems

            this.redisService.setCache("typesOfItems", JSON.stringify(ResultWrapper<TypeOfItemDto[]>(true, result, null), null, 8))

            return ResultWrapper<TypeOfItemDto[]>(true, result, null);
        } catch (error) {
            return ResultWrapper<TypeOfItemDto[]>(false, null, error)
        }
    }

    async findById(id: string): Promise<Result<TypeOfItemDto>> {
        try {
            let typeOfItem = await TypeOfItem.findByPk(id)
            if (typeOfItem === null)
                return ResultWrapper<TypeOfItemDto>(false, null, "Veri Bulunamadı!")

            return ResultWrapper<TypeOfItemDto>(true, typeOfItem, null)
        } catch (error) {
            return ResultWrapper<TypeOfItemDto>(false, null, error)
        }
    }

    async create(payload: TypeOfItemCreateDto): Promise<Result<TypeOfItemDto>> {
        try {
            await this.redisService.removeCache("typesOfItems")
            let data = await TypeOfItem.create({
                description: payload.description
            })
            await data.save()
            return ResultWrapper<TypeOfItemDto>(true, data, null);
        } catch (error) {
            return ResultWrapper<TypeOfItemDto>(false, null, error)
        }
    }

    async update(payload: TypeOfItemUpdateDto): Promise<Result<TypeOfItemDto>> {
        try {
            await this.redisService.removeCache("typesOfItems")
            let currentData = await TypeOfItem.findByPk(payload.id)

            if (currentData === null)
                return ResultWrapper<TypeOfItemDto>(false, null, "Veri Bulunamadı!")

            currentData.description = payload.description
            await currentData.save()
            return ResultWrapper<TypeOfItemDto>(true, currentData, null);
        } catch (error) {
            return ResultWrapper<TypeOfItemDto>(false, null, error)
        }
    }

    async delete(id: string): Promise<Result<boolean>> {
        try {
            await this.redisService.removeCache("typesOfItems")
            let currentData = await TypeOfItem.destroy({
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