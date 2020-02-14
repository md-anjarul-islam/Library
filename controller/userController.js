const userHandler = require('../models/user');
const bookHandler = require('../models/book');

async function getProfile (req, res) {
    let user = req.cookies.user;
    user = await userHandler.findUser({_id: user._id});
    res.render('profile', {userInfo: user});
}

async function getEditProfile(req, res)  {
    let user = req.cookies.user;
    user = await userHandler.findUser({_id: user._id});

    if(user)
        res.render('editprofile', {userInfo: user});
}

function getAddbook (req, res) {
    res.render('addbooks');
}

async function getDashboard(req, res) {    
    let user = req.cookies.user;
    user = await userHandler.findUser({_id: user._id});
    const books = await bookHandler.showDashboardBook(user);
    res.render('dashboard', {data: books});
}

async function postSaveProfile(req, res) {
    let userId = req.cookies.user._id;
    await userHandler.editUser(userId, req.body);
    userInfo = await userHandler.findUser({_id: userId});
    
    res.render('profile', {userInfo: userInfo});
}

async function postAddbook(req, res) { 
    const newBook = req.body;
    const bookImage = req.file;
    newBook.image = bookImage.filename;
    
    let user = req.cookies.user;
    user = await userHandler.findUser({_id: user._id});
    await bookHandler.createBook(newBook, user);

    const books = await bookHandler.showBook();

    const data = {
        books,
        userInfo    : user,
        link_name   : ['/user/dashboard', '/logout'],
        link_msg    : ['Dashboard', 'Log Out']   
    }
    res.render('home', {data: data});
}

async function postEditBook (req, res) { 
    const bookId =  req.params.bookId;
    const bookInfo = req.body;

    bookInfo.image = req.file.filename;
    await bookHandler.editBook(bookId, bookInfo);  
    let token = req.cookies.token;
    token = userHandler.verifyToken(token);
    if(token){
        // if token is valid then take the user id from the token
        const books = await bookHandler.showDashboardBook({_id: token._id});
        res.render('dashboard', {data: books});
    }else{
        const error = new Error('Token does not match.')
        res.render('error', {error: error});
    }
}

async function getRemoveBook(req, res) { 
    const bookId =  req.params.bookId;    
    await bookHandler.removeBook({_id: bookId});
    const user = req.cookies.user;
    const books = await bookHandler.showDashboardBook(user);
    res.render('dashboard', {data: books});
}

module.exports = {
    getProfile,
    getEditProfile,
    getAddbook,    
    getDashboard,
    postSaveProfile,
    postAddbook,
    postEditBook,
    getRemoveBook
};