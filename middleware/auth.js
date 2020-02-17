const userHandler = require('../models/user');

// AUTHORIZATION LOGIC
// 1. IF user does not provide any token AUTH FAILS
// 2. IF the token is not correct then AUTH FAILS
// 3. IF token is correct but the user has been removed by ADMIN, AUTH FAILS
// 4. Otherwise AUTH successful

module.exports = async function(req, res, next){
    /// if cookies.token exist then verify it and take action
    let token = req.headers.token;
    if(!token) {
        res.status(401);
        next(new Error('Unauthorized Access!'));    // token not found
    } 
    else{
        verification = userHandler.verifyToken(token);
        if(!verification) {
            res.status(401);
            next(new Error('Unauthorized Access!'));        // incorrect token
        }
        else{
            let user = await userHandler.findUser({_id: verification._id});
            if(!user){
                res.status(401);
                next(new Error('Unauthorized Access!'));    // user removed by ADMIN
            }
            else{
                req.headers.user = verification;            // otherwise assign user to REQUEST HEADER
                next();
            }            
        }
    }    
};