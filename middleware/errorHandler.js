const bookHandler = require('../models/book');

module.exports = async function(err, req, res, next){
    err.message = "Unauthorized access!";
    res.header(403).render('error', {error: err});
}