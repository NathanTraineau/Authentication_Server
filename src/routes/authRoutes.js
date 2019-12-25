import { Router } from 'express';
import 'dotenv/config';
import { C_login, C_register, C_refreshToken } from '../controller/authController/userController'
import { C_registerClient } from '../controller/authController/clientController' 
import { checkParams } from '../utils/tools'
import { verifyRefreshToken, verifyToken } from '../utils/authMiddleware'
import { body } from 'express-validator'

const authRouter = Router();

authRouter.post('/login', validate('login'), checkParams, C_login)

authRouter.post('/register', validate('register'), checkParams, C_register)

authRouter.post('/registerClient',validate('registerClient'), checkParams, C_registerClient)

authRouter.post('/refreshToken',validate('refreshToken'), checkParams, verifyRefreshToken, C_refreshToken)

authRouter.post('/verifyToken', verifyToken, (req,res) => {
  res.status(200).send('Valid Token')
})

// The method that validate the parameter 

function validate(method) {

switch (method) {

    case 'login': {
      return [
        body('username', "username is not given").exists(),
        body('password', "password is not given").exists(),
      ]
    }
    case 'register' : {
        return [
        body('username', "username is not given").exists(),
        body('password', "password is not given").exists(),
        body('firstname', "firstname is not given").exists(),
        body('lastname', "lastname is not given").exists(),
        ]
    }
    case 'registerClient' : {
        return [
        body('clientID', "clientID is not given").exists(),
        body('appName', "appName is not given").exists(),
        ]
    }
    case 'refreshToken': {
        return [
          body('refreshToken', "refreshToken is not given").exists(),
        ]
      }
  }
}


export default authRouter;