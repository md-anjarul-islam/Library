const userHandler = require('../models/user');
const bookHandler = require('../models/book');

async function getAllUser (req, res) {
    let users = await userHandler.findAllUser();
    users = users.filter( (user) => user.username!=='admin');
    res.json(users);
};

async function getSingleUser (req, res) {
    let userId = req.params.userId;
    let user = await userHandler.findUser({_id: userId});
    res.json(user);
};

async function getAllBook (req, res) {
    let books = await bookHandler.findAllBook();
    res.json(books);
};

async function getSingleBook (req, res) {
    let bookId = req.params.bookId;
    let book = await bookHandler.findSingleBook({_id: bookId});
    res.json(book);
};

async function RemoveUser (req, res) {
    const userId = req.params.userId;
    const msg1 = await bookHandler.removeUserBook({_id: userId});
    const msg2 = await userHandler.removeUser(userId);
    
    res.json({ message: [msg1, msg2] });
};

async function RemoveBook(req, res) {
    const bookId = req.params.bookId;
    const message = await bookHandler.removeBook({_id: bookId});
    const result = {message};

    res.json(result);
};

module.exports = {
    getAllUser,
    getSingleUser,
    getAllBook,
    getSingleBook,
    RemoveUser,
    RemoveBook
};