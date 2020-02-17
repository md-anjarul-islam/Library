const Joi = require('@hapi/joi');
const {loginSchema, registrationSchema, bookSchema, userUpdateSchema, bookupDateSchema} = require('../models/validationSchema');

async function loginFormValidate(req, res, next){
    try{
        req.body = await loginSchema.validateAsync(req.body);
        next();
    }
    catch(err){
        let errmsg = "";
        for(d of err.details){
            errmsg+=d.message;              /// concat all the error message
        }
        res.status(400);
        res.json({message: "Bad request"});
    }
}

async function regFormValidate(req, res, next){
    try{
        req.body = await registrationSchema.validateAsync(req.body);
        next();
    }
    catch(err){
        let errmsg = "";
        for(d of err.details){
            errmsg+=d.message;              /// concat all the error message
        }
        res.status(400)
        res.json({message: "Bad request"});
    }
}

async function userUpdateFormValidate(req, res, next){
    try{
        req.body = await userUpdateSchema.validateAsync(req.body);
        next();
    }
    catch(err){
        let errmsg = "";
        for(d of err.details){
            errmsg+=d.message;              /// concat all the error message
        }
        res.status(400);
        res.json({message: "Bad request"});
    }
}

async function bookFormValidate(req, res, next){
    try{
        req.body = await bookSchema.validateAsync(req.body);
        next();
    }
    catch(err){
        let errmsg = "";
        for(d of err.details){
            errmsg+=d.message;              /// concat all the error message
        }
        res.status(400);
        res.json({message: "Bad request"});
    }
}

async function bookUpdateFormValidate(req, res, next){
    try{
        req.body = await bookupDateSchema.validateAsync(req.body);
        next();
    }
    catch(err){
        let errmsg = "";
        for(d of err.details){
            errmsg+=d.message;              /// concat all the error message
        }
        res.status(400);
        res.json({message: "Bad request"});
    }
}

module.exports = {
    loginFormValidate,
    regFormValidate,
    userUpdateFormValidate,
    bookFormValidate,
    bookUpdateFormValidate
};