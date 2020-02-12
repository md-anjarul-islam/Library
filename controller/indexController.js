const userHandler = require('../models/user');
const bookHandler = require('../models/book');

async function getHome (req, res) {
    const books = await bookHandler.showBook();
    let token = req.cookies.token;

    if(token){
        // if a token exists in cookie then verify it and take action
        token = userHandler.verifyToken(token);
        let user = await userHandler.findUser({_id: token._id});
        if(user){
            const data = {
                books,
                user,
                link_name   : ['/user/dashboard', '/logout'],
                link_msg    : ['Dashboard', 'Log Out']   
            }  
            res.render('home', {data: data} );   // redirect to homepage
        }else{
            const data = {
                books,
                message     : "Verification failed.",
                link_name   : ['/user/dashboard', '/logout'],
                link_msg    : ['Dashboard', 'Log Out']   
            }  
            res.render('home', {data: data} );   // redirect to homepage
        }        
    }
    /// token not found in cookies
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
    const books = await bookHandler.showBook();
    let token = req.cookies.token;
    if(token){
        // if a token exists in cookie then verify it and take action
        token = userHandler.verifyToken(token);
        let user = await userHandler.findUser({_id: token._id});
        if(user){
            const data = {
                message     : 'You are already logged in',
                books,
                user,
                link_name   : ['/user/dashboard', '/logout'],
                link_msg    : ['Dashboard', 'Log Out']   
            }
            res.render('home', {data: data});
        }else{
            const data = {
                message     : "Verification failed",
                books,                
                link_name   : ['/user/dashboard', '/logout'],
                link_msg    : ['Dashboard', 'Log Out']   
            }
            res.render('home', {data: data});
        }            
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
    const books = await bookHandler.showBook();
    let token = req.cookies.token;
    if(token){
        // if a token exists in cookie then verify it and take action
        token = userHandler.verifyToken(token);
        let user = await userHandler.findUser({_id: token._id});
        if(user){
            user = await userHandler.findUser({_id: user._id});
            const data = {
                message     : 'You are already logged in',
                books,
                user,
                link_name   : ['/user/dashboard', '/logout'],
                link_msg    : ['Dashboard', 'Log Out']   
            }
            res.render('home', {data: data});
        }else{
            user = await userHandler.findUser({_id: user._id});
            const data = {
                message     : 'Verification failed.',
                books,                
                link_name   : ['/user/dashboard', '/logout'],
                link_msg    : ['Dashboard', 'Log Out']   
            }
            res.render('home', {data: data});
        }
        
    }
    else
        res.render('register');
}

async function postLogin(req, res) {
    let user = req.body;
    console.log('user from body', user);
    const validation = await userHandler.loginValidate(user);
    const books = await bookHandler.showBook();

    if(validation == false){
        const message = 'The username or password is incorrect.';        
        res.render('login', {info: message});
    }      
    else{
        user = await userHandler.findUser({username: user.username});
        const token = await user.getAuthToken();
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
        const user = await userHandler.findUser({username: req.body.username});
        const token = await user.getAuthToken();
        res.cookie('token', token);
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
    const message = ( books.length == 0? 'No Book found': null);

    let token = req.cookies.token;
    if(token){
        let user = userHandler.verifyToken(token);
        user = await userHandler.findUser({_id: user._id});
    
        if(user){
            const data = {
                books,
                user,
                message,
                link_name   : ['/user/dashboard', '/logout'],
                link_msg    : ['Dashboard', 'Log Out']   
            }  
            res.render('home', {data: data} );   // redirect to homepage
        } else{
            const data = {
                books,                
                message,
                link_name   : ['/user/dashboard', '/logout'],
                link_msg    : ['Dashboard', 'Log Out']   
            }  
            res.render('home', {data: data} );   // redirect to homepage
        }
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