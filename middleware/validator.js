const Joi = require('@hapi/joi');
const {loginSchema, registrationSchema, bookSchema, userUpdateSchema, bookupDateSchema} = require('../models/validationSchema');

async function loginFormValidate(req, res, next){
    try{
        req.body = await loginSchema.validateAsync(req.body);
        next();
    }
    catch(err){
        let errMessage = getErrorMessages(err);        
        res.status(400).json({message: errMessage});
    }
}

async function regFormValidate(req, res, next){
    try{
        req.body = await registrationSchema.validateAsync(req.body);
        next();
    }
    catch(err){
        let errMessage = getErrorMessages(err);        
        res.status(400).json({message: errMessage});
    }
}

async function userUpdateFormValidate(req, res, next){
    try{
        req.body = await userUpdateSchema.validateAsync(req.body);
        next();
    }
    catch(err){
        let errMessage = getErrorMessages(err);        
        res.status(400).json({message: errMessage});
    }
}

async function bookFormValidate(req, res, next){
    try{
        req.body = await bookSchema.validateAsync(req.body);
        next();
    }
    catch(err){
        let errMessage = getErrorMessages(err);        
        res.status(400).json({message: errMessage});
    }
}

async function bookUpdateFormValidate(req, res, next){
    try{
        req.body = await bookupDateSchema.validateAsync(req.body);
        next();
    }
    catch(err){
        let errMessage = getErrorMessages(err);        
        res.status(400).json({message: errMessage});
    }
}

function getErrorMessages(err){
    return err.details[0].message;
}

module.exports = {
    loginFormValidate,
    regFormValidate,
    userUpdateFormValidate,
    bookFormValidate,
    bookUpdateFormValidate
};