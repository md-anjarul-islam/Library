const bookHandler = require('../models/book');

function checkAdmin(req, res, next){
    const user = req.headers.user;
    if(!user.isAdmin || user.isAdmin == false)   
        next(new Error('Un Authorized Access!'));
    else
        next();
}

async function checkUserBook(req, res, next){
    const user = req.headers.user;
    const bookId = req.params.bookId;

    const result = await bookHandler.findSingleBook({_id: bookId, modifier: user._id});
    console.log('result ',result)
    if(!result) 
        next(new Error('Un Authorized Access!'));
    else
        next();
}

module.exports = {
    checkAdmin,
    checkUserBook
}