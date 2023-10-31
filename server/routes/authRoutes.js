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
    console.log('logout req received')
    req.logout(err => {
        if (err) {
            console.log('logout failed: ' + err)
            res.json({success: false, message: err.message}) 
        }else{
            console.log('lougout successfull')
            res.json({success: true})
        }
    });
})

export default authRouter
