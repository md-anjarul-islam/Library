const userHandler = require('../models/user');
const bookHandler = require('../models/book');
const parseToken = require('../util/tokenParser');

async function getHome (req, res) {
    const books = await bookHandler.showBook();
    if(req.cookies.token){
        // if a token exists in cookie then 
        let user = parseToken(req.cookies.token);        
        user = await userHandler.findUser({_id: user._id});
        const data = {
            books,
            user,
            link_name   : ['/user/dashboard', '/logout'],
            link_msg    : ['Dashboard', 'Log Out']   
        }  
        res.render('home', {data: data} );   // redirect to homepage
    }
    else{
            const data = {        
            books,
            link_name   : ['/login', '/register'],
            link_msg    : ['Login', 'Register']     
        }
        res.render('home', {data: data} );   // redirect to homepage
    }    
};

async function getLogin(req, res){
    if(req.cookies.token){
        let user = parseToken(req.cookies.token);        
        user = await userHandler.findUser({_id: user._id});
        const books = await bookHandler.showBook();        
            const data = {
                message     : 'You are already logged in',
                books,
                user,
                link_name   : ['/user/dashboard', '/logout'],
                link_msg    : ['Dashboard', 'Log Out']   
            }
            res.render('home', {data: data});
    }
    else
        res.render('login');
}

async function getLogout (req, res) {
    // const user = await userHandler.loggedUser();
    // await userHandler.removeSession(user);
    res.clearCookie('token');

    const books = await bookHandler.showBook();
    const data = {
        books,
        link_name   : ['/login', '/register'],
        link_msg    : ['Login', 'Register'],        
    }
    res.render('home', {data: data} );   // redirect to homepage
}

async function getRegister(req, res) {
    const user = await userHandler.loggedUser();
    if(user){
        const books = await bookHandler.showBook();        
            const data = {
                message     : 'You are already logged in',
                books,
                user,
                link_name   : ['/user/dashboard', '/logout'],
                link_msg    : ['Dashboard', 'Log Out']   
            }
            res.render('home', {data: data});
    }
    else
        res.render('register');
}

async function postLogin (req, res) {
    let user = req.body;
    const validation = await userHandler.loginValidate(user);
    const books = await bookHandler.showBook();    

    if(validation == false){
        const message = 'The username or password is incorrect.';        
        res.render('login', {info: message});
    }      
    else{
        await userHandler.addSession({username: user.username});
        user = await userHandler.loggedUser();        
        const userInfo = {
            _id: user._id
        };

        const token = userHandler.getAuthToken(userInfo);
        res.cookie('token', token);

            if(user.username === 'admin'){           
                const data = {
                    books,
                    user,
                    link_name   : ['/user/dashboard', '/logout'],
                    link_msg    : ['Dashboard', 'Log Out']   
                    }
                res.render('home', {data: data});
            }    
            else{
                const data = {
                    books,
                    user,
                    link_name   : ['/user/dashboard', '/logout'],
                    link_msg    : ['Dashboard', 'Log Out']   
                }
                res.render('home', {data: data});
            }
    }
}

async function postRegister (req, res) {        
    const result = await userHandler.createUser(req.body);
    const books = await bookHandler.showBook();

    if(!result){        
        const message = 'Username and Email should be unique! Please try again using a unique name and email.';        
        res.render('register', {info: message});
    }
    else{
        const data = {
            books,
            user        : req.body,
            link_name   : ['/user/dashboard', '/logout'],
            link_msg    : ['Dashboard', 'Log Out']   
        }
        res.render('home', {data: data});
    }
}

async function postSearchBook (req, res) {
    const keyword = req.body.keyword;
    const books = await bookHandler.searchBook(keyword);
    const user = await userHandler.loggedUser();
    const message = ( books.length == 0? 'No Book found': null);
    if(user){
        const data = {
            books,
            user,
            message,
            link_name   : ['/user/dashboard', '/logout'],
            link_msg    : ['Dashboard', 'Log Out']   
        }  
        res.render('home', {data: data} );   // redirect to homepage
    }
    else{
            const data = {        
            books,
            message,
            link_name   : ['/login', '/register'],
            link_msg    : ['Login', 'Register']     
        }
        res.render('home', {data: data} );   // redirect to homepage
    }  
};

module.exports = {
    getLogin,
    getLogout,
    getRegister,
    getHome,
    postLogin,
    postRegister,
    postSearchBook
};