import BrandRoute from "../routes/brand.route"
import * as express from 'express';
import BrandRepository from '../services/concrete/brand-repository'
import redisClient from "../service-collection/redis-di"

class BrandController {

    private brandRepository: BrandRepository

    constructor() {
        this.brandRepository = new BrandRepository(redisClient);
    }

    public initRoutes() {
        let route = new BrandRoute(this.GetAll, this.GetById, this.Create, this.Update, this.Delete)
        return route.initRoutes()
    }

    GetAll = async (request: express.Request, response: express.Response) => {
        let result = await this.brandRepository.findAll()
        response.send(result);
    }

    GetById = async (request: express.Request, response: express.Response) => {
        let result = await this.brandRepository.findById(request.params.id)
        response.send(result);
    }

    Create = async (request: express.Request, response: express.Response) => {
        let result = await this.brandRepository.create(request.body)
        response.send(result);
    }

    Update = async (request: express.Request, response: express.Response) => {
        let result = await this.brandRepository.update(request.body)
        response.send(result);
    }

    Delete = async (request: express.Request, response: express.Response) => {
        let result = await this.brandRepository.delete(request.params.id)
        response.send(result);
    }
}

export default BrandController