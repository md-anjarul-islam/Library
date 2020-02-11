const userHandler = require('../models/user');
const bookHandler = require('../models/book');

async function getProfile (req, res) {
    const user = await userHandler.loggedUser();    
    res.render('profile', {userInfo: user});
}

async function getEditProfile(req, res)  {
    const userId = req.params.userId;
    const userInfo = await userHandler.findUser(userId);

    if(userInfo)
        res.render('editprofile', {userInfo: userInfo});
}

function getAddbook (req, res) {
    res.render('addbooks');
}


async function getDashboard(req, res) {
    const user = await userHandler.loggedUser();
    const books = await bookHandler.showDashboardBook(user);
    res.render('dashboard', {data: books});
}

async function postSaveProfile(req, res) {
    const userId = req.params.userId;
    let userInfo = await userHandler.findUser(userId);
    await userHandler.editUser(userId, req.body);
    userInfo = await userHandler.findUser(userId);
    
    res.render('profile', {userInfo: userInfo});
}

async function postAddbook(req, res) { 
    const newBook = req.body;
    console.log('hitted on postaddbook', newBook);

    const bookImage = req.file;
    newBook.image = bookImage.filename;
    
    const user = await userHandler.loggedUser();
    await bookHandler.createBook(newBook, user);

    const books = await bookHandler.showBook();
    const userInfo = await userHandler.loggedUser();

    const data = {
        books,
        userInfo,
        link_name   : ['/user/dashboard', '/logout'],
        link_msg    : ['Dashboard', 'Log Out']   
    }
    res.render('home', {data: data});
}

async function postEditBook (req, res) { 
    const bookId =  req.params.bookId;
    const bookInfo = req.body;
    console.log('Book Information', bookInfo);

    bookInfo.image = req.file.filename;
    await bookHandler.editBook(bookId, bookInfo);  
    const user = await userHandler.loggedUser();
    const books = await bookHandler.showDashboardBook(user);
    res.render('dashboard', {data: books});
}

async function getRemoveBook(req, res) { 
    const bookId =  req.params.bookId;    
    await bookHandler.removeBook(bookId);  
    const user = await userHandler.loggedUser();
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