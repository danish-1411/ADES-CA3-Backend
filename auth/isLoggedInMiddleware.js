// Name      : Mohd Danish Shafiq
// Class     : DIT 2B22
// Admin no. : p2043483

//---------------------------------------------------------------------
// imports
//---------------------------------------------------------------------
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config.js");

//---------------------------------------------------------------------
// objects / functions
//---------------------------------------------------------------------
var check = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader === null || authHeader === undefined || !authHeader.startsWith("Bearer ")) {
    res.status(401).send();
    return;
  }
  const token = authHeader.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] }, (error, decodedToken) => {
    if (error) {
      res.status(401).send();
      return;
    }

    // decodedToken is the payload that you used earlier to sign the token
    req.decodedToken = decodedToken;
    next();
  });
};

//---------------------------------------------------------------------
// exports
//---------------------------------------------------------------------
module.exports = check;
