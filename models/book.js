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

async function findSingleBook(bookInfo){
   try{
      const book = await Book.findOne(bookInfo);
      return book;
   }catch(err){
       return null;
   }
}

async function findUsersBook(user){
    return await Book.find({modifier: user._id});
}

async function findAllBook(){
    return await Book.find();
}

async function createBook(bookInfo, userId){
    bookInfo.modifier = userId;
    const newBook = new Book(bookInfo);
    return await newBook.save();
}

async function editBook(bookId, updatedBook){    
    const oldBook = Book.findOne({_id: bookId});
    if(updatedBook.image)
        deleteImage(oldBook.image);
    
    return await Book.updateOne({_id: bookId}, {$set: updatedBook});
}

async function removeBook(book){
    book = await Book.findOne(book);
    if(!book)
        return null;

    deleteImage(book.image);    
    return await Book.deleteOne({_id: book._id});    
}

async function removeUserBook(user){
    books = await Book.find({modifier: user._id});
    let message = '';
    books.forEach( async (book) => {
       deleteImage(book.image);
       message+= await Book.deleteOne({_id: book._id});
    });
    return message;
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

function deleteImage(fileName){
    
    if( !fileName )   
        return null;

    const location = path.join(__dirname, '../', 'public/uploads',fileName);
    fs.unlink(location, (err) => {
        if(err) console.log('Error deleting image file');
        else    console.log('Image file deleted successfully');
    })
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