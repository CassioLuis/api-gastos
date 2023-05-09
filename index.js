import express from 'express'
import ConnectDatabase from './src/database/db.js'
import UserRoute from './src/routes/user.route.js'
import SpentRoute from './src/routes/spent.route.js'


const app = express()
const port = 8080

ConnectDatabase()
app.use(express.json())
app.use("/users", UserRoute)
app.use("/spents", SpentRoute)

app.listen(port)