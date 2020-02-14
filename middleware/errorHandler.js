module.exports = async function(err, req, res, next){    
    res.json({err: err.message});
}