import pkg from 'pg';
import "dotenv/config"
import _context from "./db"

import {
    EmployeeSeed,
    PositionSeed,
    RoleSeed,
    TitleSeed,
    UserSeed
} from "./seeder"

export default async function createDatabaseIfNotExists() {
    var pool = new pkg.Pool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        port: Number(process.env.DB_PORT),
        password: process.env.DB_PASS,
    });
    var client = await pool.connect();
    const dbCheck = await client.query(`SELECT count(*) FROM pg_database where datname='${process.env.DB_NAME}';`);
    if (dbCheck.rows[0].count == 0) {
        await client.query(`CREATE DATABASE "${process.env.DB_NAME}"; `);
        client.release(true);
        await _context.sync({ force: false })

        // await RoleSeed()
        // await TitleSeed()
        // await PositionSeed()
        // await EmployeeSeed()
        // await UserSeed()
    }
}