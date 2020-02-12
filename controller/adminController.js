const userHandler = require('../models/user');
const bookHandler = require('../models/book');

async function getAllUser (req, res) {
    let users = await userHandler.findAllUser();
    users = users.filter( (user) => user.username!=='admin');  

    res.render('alluser', {users: users});
};

async function getAllBook (req, res) {
    let books = await bookHandler.findAllBook();
    res.render('allbook', {data: books});
};

async function getRemoveUser (req, res) {
    const userId = req.params.userId;
    await bookHandler.removeUserBook({_id: userId});
    await userHandler.removeUser(userId);
    
    let users = await userHandler.findAllUser();
    users = users.filter( (user) => user.username!=='admin');  

    res.render('alluser', {users: users});
};

async function getRemoveBook(req, res) {
    const bookId = req.params.bookId;
    await bookHandler.removeBook({_id: bookId});
    
    let books = await bookHandler.findAllBook();   

    res.render('allbook', {data: books});
};

module.exports = {
    getAllUser,
    getAllBook,
    getRemoveUser,
    getRemoveBook
};