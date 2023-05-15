import express from 'express'
import ConnectDatabase from './database/db.js'
import cors from 'cors'
import dotenv from 'dotenv'


import UserRoute from './routes/user.route.js'
import AuthRoute from './routes/auth.route.js'
import SpentRoute from './routes/spent.route.js'

dotenv.config();
const app = express()
const port = process.env.PORT || 8080

ConnectDatabase()
app.use(cors())
app.use(express.json())
app.use("/users", UserRoute)
app.use("/spents", SpentRoute)
app.use("/auth", AuthRoute)

app.listen(port, () => console.log(`Server runing on port: ${port}`))