import bodyParser from 'body-parser';
import {Router as expressRouter} from 'express'
const apiRouter = expressRouter();
import User from '../models/userModel.js';



//upload keypad game results
apiRouter.post('/gameResult', bodyParser.json(), (req, res)=>{
    console.log('/gameResult req received for ' + req.body.game)
    if(req.isAuthenticated()){
        let game = req.body.game;
        let result = req.body.result;
        let {date, time} = getDate();
        const newResult = {result, date, time};
        let update;

        if(game === 'red light green light'){update = {$push: {redLightGreenLight: newResult}}}
        else if(game === 'keypad game'){update = {$push: {keypadGame: newResult}}}
        else if(game === 'memory game'){update = {$push: {memoryGame: newResult}}}
        else if(game === 'math game'){update = {$push: {mathGame: newResult}}}

        User.findOneAndUpdate({ _id: req.user._id },update)
        .then(()=>{
            res.json({success: true})
            console.log('game result added successfully')
        }).catch(err => {
            console.log('Error uploading game result: ', err);
            res.json({success: false, message: "Couldn't upload your result. Please play again"})
        });

    }else{
        console.log('user not authenticated on route /gameResult')
        res.json({success: false, message: 'user not authenticated. Please log in'})
    }
})
function getDate(){
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDate = new Date()

    const day = days[currentDate.getUTCDay()];
    const date = currentDate.getUTCDate();
    const month = months[currentDate.getUTCMonth()];
    const year = currentDate.getUTCFullYear();
    const formattedDate = `${day} ${date} ${month} ${year}`;

    const hours = String(currentDate.getUTCHours() + 3).padStart(2, '0');
    const minutes = String(currentDate.getUTCMinutes()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;

    return {date: formattedDate, time: formattedTime}
}

//upload form result
apiRouter.post('/fromResult', bodyParser.json(), (req, res)=>{
    console.log('/fromResult req received')
    if(req.isAuthenticated()){
        let data = req.body.data;
        let score = req.body.score;

        User.findOneAndUpdate({ _id: req.user._id },{$set: {
            formScore: score, formData: data
        }})
        .then(()=>{
            console.log('form results added successfully')
            res.json({success: true})
        }).catch(err => {
            console.log('Error uploading form result: ', err);
            res.json({success: false, message: "Couldn't upload your result. Please try again"})
        });

    }else{
        console.log('user not authenticated on route /formResult')
        res.json({success: false, message: 'user not authenticated. Please log in'})
    }
})
//auth routes
import authRouter from './authRoutes.js'
apiRouter.use('/auth', authRouter)

export default apiRouter
