const userHandler = require('../models/user');

module.exports = function(req, res, next){
    /// if cookies.token exist then verify it and take action
    if(req.cookies.token){
        const token = userHandler.verifyToken(req.cookies.token);
        if(token){
            req.body.user = token;
            next();
        }else{
            next(new Error('You are not authenticated user.'));
        }

    }else{
        next(new Error('Token is not provided.'));
    }    
};