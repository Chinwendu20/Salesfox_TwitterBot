import express from 'express'
import bodyParser from 'body-parser'
import approutes from './routes.js'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()



const app = express()
const port = process.env.PORT ? process.env.PORT:3000




app.use(cors())

app.use(bodyParser.json())


app.use("", approutes)


app.listen(port, ()=>console.log(` Server running on ${(process.env.host_name)}:${port}`))