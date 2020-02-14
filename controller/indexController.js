const userHandler = require('../models/user');
const bookHandler = require('../models/book');

async function getHome (req, res) {
    const books = await bookHandler.showBook();
    const data = { books }
    res.json(data);
};

// async function getLogin(req, res){
//     const books = await bookHandler.showBook();
//     let token = req.cookies.token;
//     if(token){
//         // if a token exists in cookie then verify it and take action
//         token = userHandler.verifyToken(token);
//         let user = await userHandler.findUser({_id: token._id});
//         if(user){
//             const data = {
//                 message     : 'You are already logged in',
//                 books,
//                 user,
//                 link_name   : ['/user/dashboard', '/logout'],
//                 link_msg    : ['Dashboard', 'Log Out']   
//             }
//             res.json('home', {data: data});
//         }else{
//             const data = {
//                 message     : "Verification failed",
//                 books,                
//                 link_name   : ['/user/dashboard', '/logout'],
//                 link_msg    : ['Dashboard', 'Log Out']   
//             }
//             res.json('home', {data: data});
//         }            
//     }
//     else
//         res.json('login');
// }

// async function getLogout (req, res) {
//     // const user = await userHandler.loggedUser();
//     // await userHandler.removeSession(user);
//     res.clearCookie('token');

//     const books = await bookHandler.showBook();
//     const data = {
//         books,
//         link_name   : ['/login', '/register'],
//         link_msg    : ['Login', 'Register'],        
//     }
//     res.json('home', {data: data} );   // redirect to homepage
// }

// async function getRegister(req, res) {
//     const books = await bookHandler.showBook();
//     let token = req.cookies.token;
//     if(token){
//         // if a token exists in cookie then verify it and take action
//         token = userHandler.verifyToken(token);
//         let user = await userHandler.findUser({_id: token._id});
//         if(user){
//             user = await userHandler.findUser({_id: user._id});
//             const data = {
//                 message     : 'You are already logged in',
//                 books,
//                 user,
//                 link_name   : ['/user/dashboard', '/logout'],
//                 link_msg    : ['Dashboard', 'Log Out']   
//             }
//             res.json('home', {data: data});
//         }else{
//             user = await userHandler.findUser({_id: user._id});
//             const data = {
//                 message     : 'Verification failed.',
//                 books,                
//                 link_name   : ['/user/dashboard', '/logout'],
//                 link_msg    : ['Dashboard', 'Log Out']   
//             }
//             res.json('home', {data: data});
//         }
        
//     }
//     else
//         res.json('register');
// }

async function postLogin(req, res) {
    let user = req.body;
    const validation = await userHandler.loginValidate(user);

    if(validation == false){
        const message = 'The username or password is incorrect.';
        const data = {
            message
        }
        res.json(data);
    }      
    else{
        user = await userHandler.findUser({username: user.username});
        const token = await user.getAuthToken();
        const data = { user };
        // send token in header
        res.set({'x-token': token}).json(data);
    }
}

async function postRegister (req, res) {        
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

// async function postSearchBook (req, res) {
//     const keyword = req.body.keyword;
//     const books = await bookHandler.searchBook(keyword);    
//     const message = ( books.length == 0? 'No Book found': null);

//     let token = req.cookies.token;
//     if(token){
//         let user = userHandler.verifyToken(token);
//         user = await userHandler.findUser({_id: user._id});
    
//         if(user){
//             const data = {
//                 books,
//                 user,
//                 message,
//                 link_name   : ['/user/dashboard', '/logout'],
//                 link_msg    : ['Dashboard', 'Log Out']   
//             }  
//             res.json('home', {data: data} );   // redirect to homepage
//         } else{
//             const data = {
//                 books,                
//                 message,
//                 link_name   : ['/user/dashboard', '/logout'],
//                 link_msg    : ['Dashboard', 'Log Out']   
//             }  
//             res.json('home', {data: data} );   // redirect to homepage
//         }
//     }
    
//     else{
//             const data = {        
//             books,
//             message,
//             link_name   : ['/login', '/register'],
//             link_msg    : ['Login', 'Register']     
//         }
//         res.json('home', {data: data} );   // redirect to homepage
//     }  
// };

module.exports = {
    // getLogin,
    // getLogout,
    // getRegister,
    getHome,
    postLogin,
    postRegister
    // postSearchBook
};