const bookHandler = require('../models/book');

// Checks the isAdmin property of an user
function checkAdmin(req, res, next){
    const user = req.headers.user;
    if(!user.isAdmin || user.isAdmin == false) {
        res.status(401)
        next(new Error('Unauthorized Access!'));
    }
    else
        next();
}

// Checks whether the right person is requesting for his own information or not
async function verify_user(req, res, next){
    const user = req.headers.user;
    
    if(req.params.userId && req.params.userId === user._id) // the requested user ID matches with the credentials ID
        next();
    else{
        res.status(400);
        next(new Error('Bad Request!'));
    }
}

// Checks whether the right person is requesting for his own book or not
async function verify_modifier(req, res, next){
    const user = req.headers.user;
    const bookId = req.params.bookId;

    const result = await bookHandler.findSingleBook({_id: bookId, modifier: user._id}); // find book using the bookID and modifier
    if(!result) {
        res.status(404);            // The book is not found
        next(new Error('Not Found!'));
    }
    else
        next();
}

module.exports = {
    checkAdmin,
    verify_user,
    verify_modifier
}