const userHandler = require('../models/user');
const bookHandler = require('../models/book');

async function getHome (req, res) {
    const books = await bookHandler.findAllBook();

    if(books.length == 0) res.json({message: "No book found!"});
    else res.json({books});    
};

async function login(req, res) {
    let user = req.body;
    const validation = await userHandler.loginValidate(user);

    if(validation == false){
        const message = 'The username or password is incorrect.';       
        res.json({message});
    }      
    else{
        user = await userHandler.findUser({username: user.username});
        const token = await user.getAuthToken();
        // send token in header
        res.set({'x-token': token}).json(user);
    }
}

async function register (req, res) {        
    const result = await userHandler.createUser(req.body);
    if(!result){ 
        const data = {
            message : 'Username and Email should be unique! Please try again using a unique name and email.'
        }       
        res.json(data);
    }
    else{
        const user = await userHandler.findUser({username: req.body.username});
        const token = await user.getAuthToken();
        
        const data = {
            user
        }
        res.set({'x-token': token}).json(data);
    }
}

module.exports = {
    getHome,
    login,
    register
};