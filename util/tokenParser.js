
module.exports = function(token){
    return jwt.decode(token);
}