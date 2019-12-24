const jwt = require('jsonwebtoken');
import { findClient } from '../models/clientModel'
import { findUser } from '../models/userModel'


export function verifyToken(req,res,next) {
    const bearerHeader = req.headers['authorization'] || req.body.token || req.query.token;

  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
  }else{
    res.status(401).send({ errors : { msg : 'Access Denied, there is no token'}});
  }

    try {
        const verified = jwt.verify(req.token, process.env.ACCESS_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send({ errors : { msg : 'Access Denied, invalid token'}});
    }
}

export function verifyRefreshToken(req,res,next) {
  const refreshToken = req.body.refreshToken || req.query.refreshToken;

  if (!refreshToken) {
    res.status(401).send({ errors : { msg : 'Access Denied, there is no token'}});
  }

  try {
      const verified = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
      req.user = verified;
      next();
  } catch (err) {
      res.status(400).send({ errors : { msg : 'Invalid Refresh Token'}});
  }
} 

export function verifyRole(roles) {
  return async function(req,res,next){
    const user = await findUser(req.user.username) // we check if the user 
    //req.user.role = user.role
    if(roles.indexOf(req.user.role) > -1){
      next()
    }else{
      res.status(401).send({ errors : { msg : 'Access Denied, you are not authorized to do this'}})
    }
  }
}


export async function verifyClient(req,res,next){
    const clientID = req.body.clientId;
    const appName = req.body.appName;
    const client = await findClient(clientID)
    if(!client){
        res.status(400).send({ errors : { msg : 'Invalid Client ID'}})
    }else{
      next();
    }
}