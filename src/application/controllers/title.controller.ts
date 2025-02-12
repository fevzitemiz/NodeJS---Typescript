import TitleRoute from "../routes/title.route"
import * as express from 'express';
import TitleRepository from '../services/concrete/title-repository'
import redisClient from "../service-collection/redis-di"

class TitleController {
    public titleRepository: TitleRepository

    constructor() {
        this.titleRepository = new TitleRepository(redisClient);
    }

    public initRoutes() {
        let route = new TitleRoute(this.GetAll, this.GetById, this.Create, this.Update, this.Delete)
        return route.initRoutes()
    }

    GetAll = async (request: express.Request, response: express.Response) => {
        let result = await this.titleRepository.findAll()
        response.send(result);
    }

    GetById = async (request: express.Request, response: express.Response) => {
        let result = await this.titleRepository.findById(request.params.id)
        response.send(result);
    }

    Create = async (request: express.Request, response: express.Response) => {
        let result = await this.titleRepository.create(request.body)
        response.send(result);
    }

    Update = async (request: express.Request, response: express.Response) => {
        let result = await this.titleRepository.update(request.body)
        response.send(result);
    }

    Delete = async (request: express.Request, response: express.Response) => {
        let result = await this.titleRepository.delete(request.params.id)
        response.send(result);
    }
}

export default TitleController