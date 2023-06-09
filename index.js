import 'dotenv/config'
import './database/connectdb.js'
import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.route.js'
import linkRouter from './routes/link.route.js'
import taskRouter from './routes/task.route.js'
import subtaskRouter from './routes/subtask.route.js'
import cookieParser from 'cookie-parser'

const app = express();

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2 ]
app.use(
    cors({
        origin: function (origin, callback) {
            console.log("😲😲😲 =>", origin);
            if (!origin || whiteList.includes(origin)) {
                return callback(null, origin);
            }
            return callback(
                "Error de CORS origin: " + origin + " No autorizado!"
            );
        },
        credentials: true,
    })
);


app.use(express.json());
app.use(cookieParser())
app.use('/api/v1/', authRouter)
app.use("/api/v1/links", linkRouter)
app.use("/api/v1/tasks", taskRouter)
app.use("/api/v1/subtasks", subtaskRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('iniciado servidor🔥💧') )