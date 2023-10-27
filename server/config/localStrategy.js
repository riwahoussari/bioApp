import passport from 'passport'
import User from '../models/userModel.js'
import { Strategy as LocalStrategy } from 'passport-local';

passport.use('user', new LocalStrategy(User.authenticate()));
passport.serializeUser((user, done)=>{
    done(null, {id: user.id})
})
passport.deserializeUser(async (user, done) => {
    try {  
      let loadedUser = await User.findById(user.id);
      done(null, loadedUser);
    } catch (error) {
      done(error);
    }
});

const localRegister = (req, res)=>{
    console.log('Register request received')
    let {username, password, age, gender} = req.body;
    const usernamePattern = /^[A-Za-z0-9 ]+$/
    if(!usernamePattern.test(username)){
        console.log('username cant contain special chars')
        res.json({success: false, message: "Username can't contain special characters"})
    } else {
    User.findOne({username}).then(user => {
        if(user){
            res.json({success: false, message: 'username already exists. Please try another one.'})
        }else{
            User.register(new User({username, userType: 'user', age, gender}), password, (err,user)=>{
                if(err){
                    console.log(err);
                    res.json({success: false, message: err.message})
                }
                else{
                    passport.authenticate('user')(req, res, (err)=>{
                        if(err){console.log(err)}
                        console.log('Register request: new user created successfully')
                        res.json({
                            success: true,
                            user: {_id: user._id, username: user.username, userType: user.userType, age: user.age, gender: user.gender}
                        })
                    })
                }
            })
        }
    })
}
}


const localLogin = (req, res)=>{
    console.log('Login req received')
    const username = req.body.username;
    User.findOne({username}).then(user => {
        if(!user){
            console.log('Login request: username is incorrect')
            res.json({success: false, message: 'username or password is incorrect'})
        }else{
            const newUser = {
                userType: 'user',
                username,
                password: req.body.password
            }
            req.login(newUser, function(err){
                if(err){
                    console.log(err)
                    res.json({success: false, message: "Server couldn't log you in. Please try again."})
                }else{
                    passport.authenticate('user')(req, res, function(){
                        console.log('Login request: successfull')
                        res.json({success: true, user})
                    })
                }
            })
        }
    })
}

const Local = {localRegister, localLogin}
export default Local
