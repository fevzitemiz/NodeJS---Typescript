import TypeOfItemRoute from "../routes/type-of-item.route"
import * as express from 'express';
import TypeOfItemRepository from '../services/concrete/type-of-item-repository'
import redisClient from "../service-collection/redis-di"

class TypeOfItemController {

    private typeOfItemRepository: TypeOfItemRepository

    constructor() {
        this.typeOfItemRepository = new TypeOfItemRepository(redisClient);
    }

    public initRoutes() {
        let route = new TypeOfItemRoute(this.GetAll, this.GetById, this.Create, this.Update, this.Delete)
        return route.initRoutes()
    }

    GetAll = async (request: express.Request, response: express.Response) => {
        let result = await this.typeOfItemRepository.findAll()
        response.send(result);
    }

    GetById = async (request: express.Request, response: express.Response) => {
        let result = await this.typeOfItemRepository.findById(request.params.id)
        response.send(result);
    }

    Create = async (request: express.Request, response: express.Response) => {
        let result = await this.typeOfItemRepository.create(request.body)
        response.send(result);
    }

    Update = async (request: express.Request, response: express.Response) => {
        let result = await this.typeOfItemRepository.update(request.body)
        response.send(result);
    }

    Delete = async (request: express.Request, response: express.Response) => {
        let result = await this.typeOfItemRepository.delete(request.params.id)
        response.send(result);
    }
}

export default TypeOfItemController