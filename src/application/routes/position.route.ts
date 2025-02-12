import * as express from "express"

class PositionRoute {
    public path = "/api/position"
    public router = express.Router()

    GetAll: any
    GetById: any
    Create: any
    Update: any
    Delete: any

    constructor(GetAll: any, GetById: any, Create: any, Update: any, Delete: any) {
        this.GetAll = GetAll
        this.GetById = GetById
        this.Create = Create
        this.Update = Update
        this.Delete = Delete
    }

    public initRoutes() {
        this.router.get(this.path + "s", this.GetAll)
        this.router.get(this.path + "/:id", this.GetById)
        this.router.post(this.path, this.Create)
        this.router.put(this.path, this.Update)
        this.router.delete(this.path + "/:id", this.Delete)
        return this.router
    }
}

export default PositionRoute