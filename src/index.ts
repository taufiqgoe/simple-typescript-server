import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import * as express from "express";

AppDataSource.initialize().then(async () => {

    const users = await AppDataSource.manager.find(User)

    if (users.length < 1) {
        console.log("Inserting a new user into the database...")
        const user = new User("Timber", "Saw", 25)
        await AppDataSource.manager.save(user)
        console.log("Saved a new user with id: " + user.id)
    }

    const app = express()

    app.get('/', (req, res) => {
        res.json(
            {
                data: users
            }
        )
    })

    app.listen(8080, () => {
        console.log(`Example app listening on port 8080`)
    })

}).catch(error => console.log(error))
