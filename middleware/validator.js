const Joi = require('@hapi/joi');
const {loginSchema, registrationSchema, bookSchema} = require('../models/validationSchema');

async function loginFormValidate(req, res, next){
    const user = req.body;
    try{
        await loginSchema.validateAsync(user);
        next();
    }
    catch(err){
        let errmsg = "";
        for(d of err.details){
            errmsg+=d.message;              /// concat all the error message
        }
        res.render('login', {info: errmsg});
    }
}

async function regFormValidate(req, res, next){
    const user = req.body;
    try{
        await registrationSchema.validateAsync(user);
        next();
    }
    catch(err){
        let errmsg = "";
        for(d of err.details){
            errmsg+=d.message;              /// concat all the error message
        }
        res.render('register', {info: errmsg});
    }
}

async function bookFormValidate(req, res, next){
    const book = req.body;
    try{
        console.log(book);
        await bookSchema.validateAsync(book);
        next();
    }
    catch(err){
        let errmsg = "";
        for(d of err.details){
            errmsg+=d.message;              /// concat all the error message
        }
        res.render('addbooks', {info: errmsg});
    }
}

module.exports = {
    loginFormValidate,
    regFormValidate,
    bookFormValidate
};