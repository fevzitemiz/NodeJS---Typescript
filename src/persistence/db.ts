import { Sequelize } from "sequelize-typescript";
import User from "../domain/models/user";
import Brand from "../domain/models/brand";
import Title from "../domain/models/title";
import Position from "../domain/models/position";
import Role from "../domain/models/role";
import TypeOfItem from "../domain/models/type-of-item";
import Employee from "../domain/models/employee"
import "dotenv/config"

const _context = new Sequelize(

    {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        dialect: 'postgres',
    }
)

_context.addModels([User, Brand,Title,Position,Role,TypeOfItem,Employee])

export default _context