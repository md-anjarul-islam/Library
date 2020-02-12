const bookHandler = require('../models/book');

module.exports = async function(err, req, res, next){    
    res.render('error', {error: err});
}