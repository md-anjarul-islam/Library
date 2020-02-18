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
    user = await userHandler.findUser({_id: userId});
    
    res.json(user);
}

async function postAddbook(req, res) { 
    const newBook = req.body;
    const bookImage = req.file;
    const userId = req.params.userId;

    if(bookImage)
        newBook.image = bookImage.filename;

    await bookHandler.createBook(newBook, userId);
    const book = await bookHandler.findSingleBook(newBook);

    res.status(201);
    res.json(book);
}

async function EditBook (req, res) { 
    const bookId =  req.params.bookId;
    const bookInfo = req.body;

    if(req.file)
        bookInfo.image = req.file.filename;
    await bookHandler.editBook(bookId, bookInfo);  
    const updatedBook = await bookHandler.findSingleBook(bookInfo);
    res.json(updatedBook);
}

async function RemoveBook(req, res) { 
    const bookId =  req.params.bookId;
    const book = await bookHandler.findSingleBook({_id: bookId});

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