import Position from "../../../domain/models/position";
import { IPositionRepository } from '../abstract/iposition-repository';
import { ResultWrapper, Result } from "../../../domain/extensions/result-wrapper"
import { PositionCreateDto, PositionDto, PositionUpdateDto } from "../../../domain/dtos/position-dtos"
import RedisService from "./redis-cache"

export default class PositionRepository implements IPositionRepository {

    private redisService: RedisService;

    constructor(_redisClient: any) {
        this.redisService = new RedisService(_redisClient)
    }

    async findAll(): Promise<Result<PositionDto[]>> {
        try {
            let cache = await this.redisService.getCache("positions")
            console.log(cache)
            if (cache != null)
                return this.redisService.getCache("positions")

            let positions = await Position.findAll({
                attributes: ["id", "description"]
            })
            let result: PositionDto[] = positions

            this.redisService.setCache("positions", JSON.stringify(ResultWrapper<PositionDto[]>(true, result, null), null, 8))

            return ResultWrapper<PositionDto[]>(true, result, null);
        } catch (error) {
            return ResultWrapper<PositionDto[]>(false, null, error)
        }
    }

    async findById(id: string): Promise<Result<PositionDto>> {
        try {
            let user = await Position.findByPk(id)
            if (user === null)
                return ResultWrapper<PositionDto>(false, null, "Veri Bulunamadı!")

            return ResultWrapper<PositionDto>(true, user, null)
        } catch (error) {
            return ResultWrapper<PositionDto>(false, null, error)
        }
    }

    async create(payload: PositionCreateDto): Promise<Result<PositionDto>> {
        try {
            await this.redisService.removeCache("positions")
            let data = await Position.create({
                description: payload.description
            })
            await data.save()
            return ResultWrapper<PositionDto>(true, data, null);
        } catch (error) {
            return ResultWrapper<PositionDto>(false, null, error)
        }
    }

    async update(payload: PositionUpdateDto): Promise<Result<PositionDto>> {
        try {
            await this.redisService.removeCache("positions")
            let currentData = await Position.findByPk(payload.id)

            if (currentData === null)
                return ResultWrapper<PositionDto>(false, null, "Veri Bulunamadı!")

            currentData.description = payload.description
            await currentData.save()
            return ResultWrapper<PositionDto>(true, currentData, null);
        } catch (error) {
            return ResultWrapper<PositionDto>(false, null, error)
        }
    }

    async delete(id: string): Promise<Result<boolean>> {
        try {
            await this.redisService.removeCache("positions")
            let currentData = await Position.destroy({
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