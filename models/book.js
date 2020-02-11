const db = require('../config/db');

const bookSchema = new db.Schema({
    title       : String,
    description : String,
    author      : String,
    isbn        : String,
    rating      : Number,
    seller      : String,
    image       : String,
    modifier    : String
});

const Book = new db.model('Books', bookSchema);
/// creates a book and sends back nothing
async function createBook(Abook, user){
    Abook.modifier = user._id;
    
    const newBook = new Book(Abook);
    await newBook.save();
}

async function editBook(bookId, info){
    const books = await Book.updateOne({_id: bookId}, {$set: info});
}

async function removeBook(bookId){
    await Book.deleteOne({_id: bookId});
}

async function showBook(){
   return await Book.find();
}

async function showDashboardBook(user){
    return await Book.find({modifier: user._id});
}

async function findAllBook(){
    return await Book.find();
}

async function searchBook(keyword){
    return await Book.find()
                      .or([ 
                          {
                              author: new RegExp(keyword)
                        },
                        {
                            title: new RegExp(keyword)
                        },
                        {
                            description: new RegExp(keyword)         
                        }]);
}

module.exports = {
    createBook,
    editBook,
    removeBook,
    searchBook,
    showBook,
    findAllBook,
    showDashboardBook
};