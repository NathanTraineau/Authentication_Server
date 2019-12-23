const jwt = require('jsonwebtoken')

export function verifyToken(req,res,next) {
    const bearerHeader = req.headers['authorization'];

  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
  }else{
    res.status(401).send('Access Denied, there is no token.');
  }

    try {
        const verified = jwt.verify(req.token, process.env.CLIENT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}
