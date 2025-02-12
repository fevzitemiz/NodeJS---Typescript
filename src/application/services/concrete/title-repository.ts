import Title from "../../../domain/models/title";
import { ITitleRepository } from '../abstract/ititle-repository';
import { ResultWrapper, Result } from "../../../domain/extensions/result-wrapper"
import { TitleCreateDto, TitleDto, TitleUpdateDto } from "../../../domain/dtos/title-dtos"
import RedisService from "./redis-cache"

export default class TitleRepository implements ITitleRepository {

    private redisService: RedisService;

    constructor(_redisClient: any) {
        this.redisService = new RedisService(_redisClient)
    }

    async findAll(): Promise<Result<TitleDto[]>> {
        try {
            let cache = await this.redisService.getCache("titles")
            console.log(cache)
            if (cache != null)
                return this.redisService.getCache("titles")

            let titles = await Title.findAll({
                attributes: ["id", "description"]
            })
            let result: TitleDto[] = titles

            this.redisService.setCache("titles", JSON.stringify(ResultWrapper<TitleDto[]>(true, result, null), null, 8))

            return ResultWrapper<TitleDto[]>(true, result, null);
        } catch (error) {
            return ResultWrapper<TitleDto[]>(false, null, error)
        }
    }

    async findById(id: string): Promise<Result<TitleDto>> {
        try {
            let title = await Title.findByPk(id)
            if (title === null)
                return ResultWrapper<TitleDto>(false, null, "Veri Bulunamadı!")

            return ResultWrapper<TitleDto>(true, title, null)
        } catch (error) {
            return ResultWrapper<TitleDto>(false, null, error)
        }
    }

    async create(payload: TitleCreateDto): Promise<Result<TitleDto>> {
        try {
            await this.redisService.removeCache("titles")
            let data = await Title.create({
                description: payload.description
            })
            await data.save()
            return ResultWrapper<TitleDto>(true, data, null);
        } catch (error) {
            return ResultWrapper<TitleDto>(false, null, error)
        }
    }

    async update(payload: TitleUpdateDto): Promise<Result<TitleDto>> {
        try {
            await this.redisService.removeCache("titles")
            let currentData = await Title.findByPk(payload.id)

            if (currentData === null)
                return ResultWrapper<TitleDto>(false, null, "Veri Bulunamadı!")

            currentData.description = payload.description
            await currentData.save()
            return ResultWrapper<TitleDto>(true, currentData, null);
        } catch (error) {
            return ResultWrapper<TitleDto>(false, null, error)
        }
    }

    async delete(id: string): Promise<Result<boolean>> {
        try {
            await this.redisService.removeCache("titles")
            let currentData = await Title.destroy({
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