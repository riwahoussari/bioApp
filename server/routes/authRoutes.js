import bodyParser from 'body-parser';
import Local from '../config/localStrategy.js';
import {Router as expressRouter} from 'express'
const authRouter = expressRouter();

// local strategy routes
//user
authRouter.post('/register', bodyParser.json(), Local.localRegister);
authRouter.post('/login', bodyParser.json(), Local.localLogin);

//check athentication and return boolean + user
authRouter.post('/user', (req, res)=>{
    console.log('/user route req received');
    if(req.isAuthenticated()){
        console.log('user authenticated on route /user')
        res.json({auth: true, user: {formScore: req.user.formScore}})
    }
    else{
        console.log('user not authenticated on route /user')
        res.json({auth: false})}
})

// logout
authRouter.post('/logout', (req, res)=>{
    req.logout(err => {
        if (err) { res.json({loggedOut: false}) }
        else{res.json({loggedOut: true})}
      });
})

export default authRouter
