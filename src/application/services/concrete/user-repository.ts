import User from "../../../domain/models/user";
import { IUserRepository } from '../abstract/iuser-repository';
import { ResultWrapper, Result } from "../../../domain/extensions/result-wrapper"
import { UserCreateDto, UserDto, UserUpdateDto } from "../../../domain/dtos/user-dtos"
import RedisService from "./redis-cache"

export default class UserRepository implements IUserRepository {

    private redisService: RedisService;

    constructor(_redisClient: any) {
        this.redisService = new RedisService(_redisClient)
    }

    async findAll(): Promise<Result<UserDto[]>> {
        try {
            let cache = await this.redisService.getCache("users")
            console.log(cache)
            if (cache != null)
                return this.redisService.getCache("users")

            let users = await User.findAll({
                attributes: ["id", "nickname"]
            })
            let result: UserDto[] = users

            this.redisService.setCache("users", JSON.stringify(ResultWrapper<UserDto[]>(true, result, null), null, 8))

            return ResultWrapper<UserDto[]>(true, result, null);
        } catch (error) {
            return ResultWrapper<UserDto[]>(false, null, error)
        }
    }

    async updatePassword(id: string, newPassword: string, oldPassword: string): Promise<boolean> {
        await this.redisService.removeCache("users")
        throw new Error('Method not implemented.');
    }

    async findById(id: string): Promise<Result<UserDto>> {
        try {
            let user = await User.findByPk(id)
            if (user === null)
                return ResultWrapper<UserDto>(false, null, "Veri Bulunamadı!")

            return ResultWrapper<UserDto>(true, user, null)
        } catch (error) {
            return ResultWrapper<UserDto>(false, null, error)
        }
    }

    async create(payload: UserCreateDto): Promise<Result<UserDto>> {
        try {
            await this.redisService.removeCache("users")
            let newData = await User.create({
                nickname: payload.nickname
            })
            await newData.save()
            return ResultWrapper<UserDto>(true, newData, null);
        } catch (error) {
            return ResultWrapper<UserDto>(false, null, error)
        }
    }

    async update(payload: UserUpdateDto): Promise<Result<UserDto>> {
        try {
            await this.redisService.removeCache("users")
            let currentData = await User.findByPk(payload.id)

            if (currentData === null)
                return ResultWrapper<UserDto>(false, null, "Veri Bulunamadı!")

            currentData.nickname = payload.nickname
            await currentData.save()
            return ResultWrapper<UserDto>(true, currentData, null);
        } catch (error) {
            return ResultWrapper<UserDto>(false, null, error)
        }
    }

    async delete(id: string): Promise<Result<boolean>> {
        try {
            await this.redisService.removeCache("users")
            let currentData = await User.destroy({
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