const userHandler = require('../models/user');

module.exports = function(req, res, next){
    /// if cookies.token exist then verify it and take action
    let token = req.headers.token;
    if(token){
        token = userHandler.verifyToken(token);
        if(token){
            req.headers.user = token;
            next();
        }else{
            next(new Error('Unauthorized Access!.'));
        }

    }else{
        next(new Error('Unauthorized Access!'));
    }    
};