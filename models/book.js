const db = require('../config/db');
const fs = require('fs');
const path = require('path');

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

async function removeBook(book){
    book = await Book.findOne(book);
    const location = path.join(__dirname, '../', 'public/uploads',book.image);
    // console.log(location);
    fs.unlink(location, (err) => {
        if(err)
            console.log('Error deleting image file');
        else
            console.log('Image file deleted successfully');
    })
    await Book.deleteOne({_id: book._id});
}

async function removeUserBook(user){
    books = await Book.find({modifier: user._id});
    const basepath = path.join(__dirname, '../', 'public/uploads');

    books.forEach( async (book) => {
        const location = path.join(basepath, book.image);
        fs.unlink(location, (err) => {
            if(err)
                console.log('Error deleting image file', book.image);
            else
                console.log('Image file deleted successfully', book.image);
        })
        await Book.deleteOne({_id: book._id});
    });
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
    showDashboardBook,
    removeUserBook
};