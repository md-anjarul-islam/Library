const userHandler = require('../models/user');

module.exports = function(req, res, next){
    /// if cookies.token exist then verify it and take action
    if(req.cookies.token){
        const token = userHandler.verifyToken(req.cookies.token);
        if(token){
            req.cookies.user = token;
            console.log('in middleware', req.body);
            next();
        }else{
            next(new Error('You are not an authentic user.'));
        }

    }else{
        next(new Error('Unauthorized Access!'));
    }    
};