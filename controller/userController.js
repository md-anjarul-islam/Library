const userHandler = require('../models/user');
const bookHandler = require('../models/book');

async function getProfile(req, res) {
    let user = req.headers.user;
    userInfo = await userHandler.findUser({_id: user._id});
    res.json(userInfo);
}

// async function getEditProfile(req, res)  {
//     let user = req.headers.user;
//     user = await userHandler.findUser({_id: user._id});

//     if(user)
//         res.json('editprofile', {userInfo: user});
// }

// function getAddbook (req, res) {
//     res.json('addbooks');
// }

async function getUserBooks(req, res) {    
    let user = req.headers.user;
    const books = await bookHandler.showDashboardBook({_id: user._id});
    res.json(books);
}
async function getUsersSingleBook(req, res) {    
    let user = req.headers.user;
    const books = await bookHandler.findSingleBook({modifier: user._id});
    res.json(books);
}

async function updateProfile(req, res) {
    let userId = req.headers.user._id;
    await userHandler.editUser(userId, req.body);
    userInfo = await userHandler.findUser({_id: userId});
    
    res.json(userInfo);
}

async function postAddbook(req, res) { 
    const newBook = req.body;
    const bookImage = req.file;
    newBook.image = bookImage.filename;
    
    let user = req.headers.user;
    user = await userHandler.findUser({_id: user._id});
    const message = await bookHandler.createBook(newBook, user);
    const result = { message };
    res.json(result);
}

async function EditBook (req, res) { 
    const bookId =  req.params.bookId;
    const bookInfo = req.body;

    bookInfo.image = req.file.filename;
    const message = await bookHandler.editBook(bookId, bookInfo);  
    const result = {message};
    res.json(result);
}

async function RemoveBook(req, res) { 
    const bookId =  req.params.bookId;    
    const message = await bookHandler.removeBook({_id: bookId});
    const result = {message};
    res.json(result);
}

module.exports = {
    getProfile,
    // getEditProfile,
    // getAddbook,    
    getUserBooks,
    getUsersSingleBook,
    updateProfile,
    postAddbook,
    EditBook,
    RemoveBook
};