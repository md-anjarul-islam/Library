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
    return await newBook.save();
}

async function editBook(bookId, newInfo){
    // The new image has already been saved by multer middleware
    // If an old image exists then delete it
    if(newInfo.image){
        const oldBook = Book.findOne({_id: bookId});
        if(oldBook.image){
            const location = path.join(__dirname, '../', 'public/uploads',oldBook.image);
            fs.unlink(location, (err) => {
                if(err)
                    console.log('Error deleting image file');
                else
                    console.log('Image file deleted successfully');
            })
        }
    }
    return await Book.updateOne({_id: bookId}, {$set: newInfo});
}

async function removeBook(book){
    book = await Book.findOne(book);

    if(!book)   return "No Book Found!";
    else if(!book.image)    return await Book.deleteOne({_id: book._id});   // no image found. just delete the book from db
    else{
        // delete image from server and then delete from database
        const location = path.join(__dirname, '../', 'public/uploads',book.image);
        fs.unlink(location, (err) => {
            if(err)
                console.log('Error deleting image file');
            else
                console.log('Image file deleted successfully');
        })
        return await Book.deleteOne({_id: book._id});
    }
}

async function removeUserBook(user){
    books = await Book.find({modifier: user._id});
    const basepath = path.join(__dirname, '../', 'public/uploads');
    let message = '';
    books.forEach( async (book) => {
        // if the book has an image then delete it first from server.
        if(book.image){
            const location = path.join(basepath, book.image);
            fs.unlink(location, (err) => {
                if(err)
                    console.log('Error deleting image file', book.image);
                else
                    console.log('Image file deleted successfully', book.image);
            })
        }        
       message+= await Book.deleteOne({_id: book._id});
    });
    return message;
}

async function findSingleBook(book){
   return await Book.findOne(book);
}

async function findUsersBook(user){
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
    findSingleBook,
    findAllBook,
    findUsersBook,
    removeUserBook
};