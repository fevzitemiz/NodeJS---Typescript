import express, { Express, Request, Response } from "express";
import morgan from "morgan"
import * as bodyParser from 'body-parser';
import UserController from "./controllers/user.controller";
import BrandController from "./controllers/brand.controller"
import TitleController from "./controllers/title.controller"
import PositionController from "./controllers/position.controller"
import TypeOfItemController from "./controllers/type-of-item.controller"
import cors from "cors"

const app: Express = express();

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}))
app.use(morgan("dev"))
app.use(bodyParser.json());

let userRouter = new UserController()
let brandRouter = new BrandController()
let titleRouter = new TitleController()
let positionRouter = new PositionController()
let typeOfItemController = new TypeOfItemController()

app.use('/', [userRouter.initRoutes(), brandRouter.initRoutes(), titleRouter.initRoutes(), positionRouter.initRoutes(), typeOfItemController.initRoutes()]);

export default app