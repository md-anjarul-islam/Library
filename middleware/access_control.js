const bookHandler = require('../models/book');

function checkAdmin(req, res, next){
    const user = req.headers.user;
    if(!user.isAdmin || user.isAdmin == false)   
        next(new Error('Unauthorized Access!'));
    else
        next();
}

async function verify_user(req, res, next){
    const user = req.headers.user;
    
    if(req.params.userId && req.params.userId !== user._id)
        next(new Error('Unauthorized Access!'));
    else
        next();    
}

async function verify_modifier(req, res, next){
    const user = req.headers.user;
    const bookId = req.params.bookId;

    const result = await bookHandler.findSingleBook({_id: bookId, modifier: user._id});
    if(!result) 
        next(new Error('Unauthorized Access!'));
    else
        next();
}

module.exports = {
    checkAdmin,
    verify_user,
    verify_modifier
}