const bookHandler = require('../models/book');

module.exports = async function(err, req, res, next){
    const books = await bookHandler.showBook();    
    const data = {        
        books,
        message: err.message,
        link_name   : ['/login', '/register'],
        link_msg    : ['Login', 'Register']     
    }
    res.header(403).render('home', {data: data});
}