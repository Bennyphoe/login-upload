import { DataSource, Db } from "typeorm"
import { User } from "./models/users/users.entity"
import config from "./config"
import { File } from "./models/files/files.entity"

const {db} = config

const dataSource = new DataSource({
    type: "mysql",
    host: db.host,
    port: 3306,
    username: db.user,
    password: db.password,
    database: db.database,
    entities: [User, File],
    synchronize: true,
})

// establish database connection
dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
})

export default dataSource