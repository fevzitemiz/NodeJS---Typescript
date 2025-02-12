import app from "./application/app";
import _context from "./persistence/db";
import "dotenv/config"
import createDatabaseIfNotExists from "./persistence/dbChecker" 

async function StartServer() {
    try {
        await createDatabaseIfNotExists()
        await _context.sync({ force: true })
        app.listen(process.env.APP_PORT, () => {
            console.log("Server Started!")
        })
    } catch (error) {
        console.log("Server Cannot Start" + error)
    }
}
StartServer()