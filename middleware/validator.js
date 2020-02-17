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
        res.json({error: errmsg});
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
        res.json({error: errmsg});
    }
}

async function userUpdateFormValidate(req, res, next){
    try{
        console.log(req.body);

        req.body = await userUpdateSchema.validateAsync(req.body);
        console.log(req.body);

        next();
    }
    catch(err){
        let errmsg = "";
        for(d of err.details){
            errmsg+=d.message;              /// concat all the error message
        }
        res.json({error: err});
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
        res.json({error: errmsg});
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
        res.json({error: errmsg});
    }
}

module.exports = {
    loginFormValidate,
    regFormValidate,
    userUpdateFormValidate,
    bookFormValidate,
    bookUpdateFormValidate
};