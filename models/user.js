const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET;

const userSchema = new db.Schema({
    username    : String,
    fullname    : String,
    email       : String,
    password    : String,
    isAdmin     : Boolean
});

userSchema.methods.getAuthToken = function(){
    const payload = {_id: this._id, isAdmin: this.isAdmin};
    const token = jwt.sign(payload, secretKey, {expiresIn: "1 hour"});
    return token;
}

const User = new db.model('Users', userSchema);

async function createUser(aUser){
    const conflict = await checkConflict(aUser);

    if(conflict)
        return false;

    delete user.confirmpass;
    aUser.password = await bcrypt.hash(aUser.password, 10);
    const newUser = new User(aUser);
    return await newUser.save();
}

async function editUser(userId, userInfo){
    if(userInfo.password)
        userInfo.password = await bcrypt.hash(userInfo.password, 10);

   return await User.updateOne({_id: userId}, {$set: userInfo});
}

async function removeUser(userId){
   return await User.deleteOne({_id: userId});
}

async function checkConflict(user){
    return await User.findOne().or( [ {username: user.username}, {email: user.email} ]);
}

async function loginValidate(user){
    const validUser = await User.findOne({username: user.username});
    
    if( !validUser )
        return false;
    return await bcrypt.compare(user.password, validUser.password);    
}

async function findUser(userInfo){
    return await User.findOne(userInfo).select({password: 0});
}

async function findAllUser(){
    return await User.find().select({password: 0});
}

function verifyToken(token){
    try{
        const verifiedUser = jwt.verify(token, secretKey);
        return verifiedUser;
    }catch(err){
        return null;
    }
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