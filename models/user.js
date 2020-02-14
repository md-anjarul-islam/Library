const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET;

const userSchema = new db.Schema({
    username    : String,
    fullname    : String,
    email       : String,
    password    : String
});

userSchema.methods.getAuthToken = function(){
    const payload = {_id: this._id};
    const token = jwt.sign(payload, secretKey, {expiresIn: "1 hour"});
    return token;
}

const User = new db.model('Users', userSchema);

function verifyToken(token){
    try{
        const verifiedUser = jwt.verify(token, secretKey);
        return verifiedUser;
    }catch(err){
        return null;
    }
}

async function createUser(Auser){
    const validation = await formInfoValidate(Auser);

    if(!validation)
        return false;
    Auser.password = await bcrypt.hash(Auser.password, 10);
    const newUser = new User(Auser);
    newUser.flag = true;
    return await newUser.save();
}

async function editUser(userId, userInfo){
   return await User.updateOne({_id: userId}, {$set: userInfo});
}

async function removeUser(userId){
   return await User.deleteOne({_id: userId});
}

async function formInfoValidate(user){
    if(user.password !== user.confirmpass)
        return false;
    delete user.confirmpass;
    const result = await User.find().or([
                                        {username: user.username}, 
                                        {email: user.email}
                                    ]);
    return result.length == 0;
}

async function loginValidate(user){
    const result = await User.findOne({username: user.username});
    if(result == null)
        return false;

    const validation = await bcrypt.compare(user.password, result.password);
    if(validation)
        return true;
    else
        return false;
}

async function findUser(user){
    userInfo = await User.findOne(user).select({password: 0});

    if(userInfo)
        return userInfo;
    else
        return false;
}

async function findAllUser(){
    return await User.find().select({password: 0});
}

module.exports = {
    createUser,
    findUser,
    editUser,
    removeUser,
    findAllUser,    
    loginValidate,
    verifyToken
};