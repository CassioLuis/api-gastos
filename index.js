import express from 'express'
import ConnectDatabase from './src/database/db.js'
import dotenv from 'dotenv'


import UserRoute from './src/routes/user.route.js'
import AuthRoute from './src/routes/auth.route.js'
import SpentRoute from './src/routes/spent.route.js'

dotenv.config();
const app = express()
const port = process.env.PORT || 8080

ConnectDatabase()
app.use(express.json())
app.use("/users", UserRoute)
app.use("/spents", SpentRoute)
app.use("/auth", AuthRoute)

app.listen(port)