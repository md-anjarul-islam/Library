const userHandler = require('../models/user');

module.exports = async function(req, res, next){
    /// if cookies.token exist then verify it and take action
    let token = req.headers.token;
    if(!token)  next(new Error('Unauthorized Access!'));
    else{
        verified = userHandler.verifyToken(token);
        if(!verified) next(new Error('Unauthorized Access!'));
        else{
            let user = await userHandler.findUser({_id: verified._id});
            if(!user)
                next(new Error('Unauthorized Access!.'));
            else{
                req.headers.user = verified;
                console.log('verification is done');
                next();
            }            
        }
    }    
};