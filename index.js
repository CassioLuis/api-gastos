import express from 'express'
import ConnectDatabase from './src/database/db.js'
import UserRoute from './src/routes/user.route.js'

const app = express()
const port = 3000

ConnectDatabase()
app.use(express.json())
app.use("/user", UserRoute)

app.listen(port)