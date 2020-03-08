const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET;

const userSchema = new db.Schema({
  username: String,
  fullname: String,
  email: String,
  password: String,
  isAdmin: Boolean
});

userSchema.methods.getAuthToken = function() {
  const payload = { _id: this._id, isAdmin: this.isAdmin };
  const token = jwt.sign(payload, secretKey, { expiresIn: "1 hour" });
  return token;
};

const User = new db.model("Users", userSchema);

async function createUser(aUser) {
  try {
    const conflict = await checkConflict(aUser);
    if (conflict) return false;

    aUser.isAdmin = false;
    aUser.password = await bcrypt.hash(aUser.password, 10);
    const newUser = new User(aUser);
    return await newUser.save();
  } catch (err) {
    return err;
  }
}

async function editUser(userId, userInfo) {
  try {
    if (userInfo.password)
      userInfo.password = await bcrypt.hash(userInfo.password, 10);
    return await User.updateOne({ _id: userId }, { $set: userInfo });
  } catch (err) {
    return err;
  }
}

async function removeUser(userId) {
  try{
    return await User.deleteOne({ _id: userId });
  }catch(err){
    return err;
  }
}

async function checkConflict(user) {
  try{
    return await User.findOne().or([
      { username: user.username },
      { email: user.email }
    ]);
  }catch(err){
    return err;
  }  
}

async function loginValidate(user) {
  try{
    const validUser = await User.findOne({ username: user.username });
    if (!validUser) return false;
    else return await bcrypt.compare(user.password, validUser.password);
  }catch(err){
    return err;
  }  
}

async function findUser(userInfo) {
  try{
    return await User.findOne(userInfo).select({ password: 0 });    
  }catch(err){
    return err;
  }
}

async function findAllUser() {
  try{
    return await User.find().select({ password: 0 });
  }catch(err){
    return err;
  }
}

function verifyToken(token) {
  try {
    const verifiedUser = jwt.verify(token, secretKey);
    return verifiedUser;
  } catch (err) {
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
