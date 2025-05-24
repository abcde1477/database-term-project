import dotenv from 'dotenv'
dotenv.config({ path: '.env' });

import express from 'express'
import cors from 'cors'
import login from './modules/login.mjs'
import admin from './modules/admin.mjs'



const server_port = process.env.PORT_BACKEND
let app = express()

//CORS策略
const corsOptions = {
    origin: [
        process.env.URL_FRONTEND,
    ],
    //'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions))
app.use('/login',login)
app.use('/admin',admin)

app.listen(server_port,()=>{
    console.log(`Node.js server started at port ${server_port}`)
})