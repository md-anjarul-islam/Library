const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new db.Schema({
    username    : String,
    fullname    : String,
    email       : String,
    password    : String,
    flag        : Boolean
});

const User = new db.model('Users', userSchema);

async function createUser(Auser){
    const validation = await regValidate(Auser);

    if(!validation)
        return false;
    Auser.password = await bcrypt.hash(Auser.password);
    const newUser = new User(Auser);
    newUser.flag = true;
    return await newUser.save();
}

async function editUser(userId, userInfo){
    await User.updateOne({_id: userId}, {$set: userInfo});
}

async function removeUser(userId){
    await User.deleteOne({_id: userId});
}

async function regValidate(user){
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
    const validation = await bcrypt.compare(user.password, result.password);

    if(validation)
        return true;
    else
        return false;
}

// async function addSession(user){
//     const userInfo = await User.findOne(user);
//     userInfo.flag = true;
//     await userInfo.save();
// }

// async function removeSession(user){
//     const userInfo = await User.findOne(user);
//     userInfo.flag = false;
//     await userInfo.save();
// }

// async function loggedUser(){
//     const user = await User.findOne({flag: true});
//     return user;
// }

async function findUser(user){
    userInfo = await User.findOne(user);

    if(userInfo)
        return userInfo;
    else
        return false;
}

async function findAllUser(){
    return await User.find();
}

const secretKey = "secretKey";
function getAuthToken (payload){    
    const token = jwt.sign(payload, secretKey);
    console.log('token = ',token);
    return token;
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
    getAuthToken,
    verifyToken
};