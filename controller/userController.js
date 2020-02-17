const userHandler = require('../models/user');
const bookHandler = require('../models/book');

async function getProfile(req, res) {
    let user = req.headers.user;
    userInfo = await userHandler.findUser({_id: user._id});
    res.json(userInfo);
}

async function getUserBooks(req, res) {
    let user = req.headers.user;
    const books = await bookHandler.findUsersBook({_id: user._id});
    res.json(books);
}
async function getUsersSingleBook(req, res) {    
    let user = req.headers.user;
    let bookId = req.params.bookId;

    const book = await bookHandler.findSingleBook({_id: bookId, modifier: user._id});
    if(!book){
        res.status(404);
        res.json({message: "No book found"});
    }
    else
        res.json(book);
}

async function updateProfile(req, res) {
    let userId = req.headers.user._id;
    let userInfo = req.body;

    await userHandler.editUser(userId, userInfo);
    userInfo = await userHandler.findUser({_id: userId});
    
    res.json(userInfo);
}

async function postAddbook(req, res) { 
    const newBook = req.body;
    const bookImage = req.file;
    newBook.image = bookImage.filename;
    
    let user = req.headers.user;
    user = await userHandler.findUser({_id: user._id});    
    await bookHandler.createBook(newBook, user);

    const book = await bookHandler.findSingleBook(newBook);
    const locationHeader = `users/${user._id}/books/${book._id}`;

    res.status(201);
    res.set({'locationHeader': locationHeader});
    res.json(book);
}

async function EditBook (req, res) { 
    const bookId =  req.params.bookId;
    const bookInfo = req.body;

    bookInfo.image = req.file.filename;
    await bookHandler.editBook(bookId, bookInfo);  
    const updatedBook = await bookHandler.findSingleBook(bookInfo);
    res.json(updatedBook);
}

async function RemoveBook(req, res) { 
    const bookId =  req.params.bookId;
    const book = await bookHandler.findSingleBook(bookInfo);

    if(!book) {
        res.status(404);
        res.json({message: "No book found"});
    }
    else{
        await bookHandler.removeBook({_id: bookId});        
        res.json({message: 'Book removed successfully'});
    }    
}

module.exports = {
    getProfile,
    getUserBooks,
    getUsersSingleBook,
    updateProfile,
    postAddbook,
    EditBook,
    RemoveBook
};