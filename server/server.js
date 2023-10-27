import 'dotenv/config'
import express from "express";
const app = express()
import mongoose from "mongoose";
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
//setup session and passport
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({mongoUrl: process.env.MONGO_URL})
}))  
app.use(passport.initialize())
app.use(passport.session())
//setup mongo database
mongo().then(console.log('mongo connected successfully.')).catch(err => console.log('mongo err: ', err))
async function mongo(){
    await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

//api routes
import apiRouter from './routes/apiRoute.js'
app.use('/api', apiRouter)

app.use(express.static('client/build'));
import path from 'path';
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

//start app
app.listen(2500, ()=>{
    console.log('server up and running on port 2500');
})
