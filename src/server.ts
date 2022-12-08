require("dotenv").config()
import express, {Application, Request, Response, NextFunction } from 'express'
const cors = require("cors")

//routes
const usersRouter = require('./routes/users.routes')

const app: Application = express()

const corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.get("/", (req: Request, res: Response) => {
    res.json({message: "ok"})
})

app.use("/users", usersRouter)

/* Error handler middleware */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

app.listen(process.env.PORT, () => {
    console.log(`app is listening at port ${process.env.PORT}`)
})