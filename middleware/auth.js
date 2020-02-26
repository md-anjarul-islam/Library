const userHandler = require("../models/user");

module.exports = async function(req, res, next) {
  let token = req.headers.token;
  let verifiedToken = userHandler.verifyToken(token);

  if (!verifiedToken) res.status(401).json({ message: "Unauthorized Access!" });
  else {
    let verifiedUser = await userHandler.findUser({ _id: verifiedToken._id });

    if (!verifiedUser)
      res.status(401).json({ message: "Unauthorized Access!" });
    else {
      req.headers.user = verifiedUser;
      next();
    }
  }
};
