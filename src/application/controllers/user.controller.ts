import UserRoute from "../routes/user.route"
import * as express from 'express';
import UserRepository from '../services/concrete/user-repository'
import redisClient from "../service-collection/redis-di"

class UserController {
    public userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository(redisClient);
    }

    public initRoutes() {
        let route = new UserRoute(this.GetAll, this.GetById, this.Create, this.Update, this.Delete)
        return route.initRoutes()
    }

    GetAll = async (request: express.Request, response: express.Response) => {
        let result = await this.userRepository.findAll()
        response.send(result);
    }

    GetById = async (request: express.Request, response: express.Response) => {
        let result = await this.userRepository.findById(request.params.id)
        response.send(result);
    }

    Create = async (request: express.Request, response: express.Response) => {
        let result = await this.userRepository.create(request.body)
        response.send(result);
    }

    Update = async (request: express.Request, response: express.Response) => {
        let result = await this.userRepository.update(request.body)
        response.send(result);
    }

    Delete = async (request: express.Request, response: express.Response) => {
        let result = await this.userRepository.delete(request.params.id)
        response.send(result);
    }
}

export default UserController