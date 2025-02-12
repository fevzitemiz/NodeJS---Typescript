import PositionRoute from "../routes/position.route"
import * as express from 'express';
import PositionRepository from '../services/concrete/position-repository'
import redisClient from "../service-collection/redis-di"

class PositionController {
    public positionRepository: PositionRepository

    constructor() {
        this.positionRepository = new PositionRepository(redisClient);
    }

    public initRoutes() {
        let route = new PositionRoute(this.GetAll, this.GetById, this.Create, this.Update, this.Delete)
        return route.initRoutes()
    }

    GetAll = async (request: express.Request, response: express.Response) => {
        let result = await this.positionRepository.findAll()
        response.send(result);
    }

    GetById = async (request: express.Request, response: express.Response) => {
        let result = await this.positionRepository.findById(request.params.id)
        response.send(result);
    }

    Create = async (request: express.Request, response: express.Response) => {
        let result = await this.positionRepository.create(request.body)
        response.send(result);
    }

    Update = async (request: express.Request, response: express.Response) => {
        let result = await this.positionRepository.update(request.body)
        response.send(result);
    }

    Delete = async (request: express.Request, response: express.Response) => {
        let result = await this.positionRepository.delete(request.params.id)
        response.send(result);
    }
}

export default PositionController