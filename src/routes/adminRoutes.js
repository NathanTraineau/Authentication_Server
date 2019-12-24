import {verifyToken, verifyRole} from '../utils/authMiddleware'
import { Router } from 'express';
import { C_updateAccess } from '../controller/authController/accessController'
import { C_changeUserRole } from '../controller/authController/userController'
import { checkParams } from '../utils/tools'
import { body } from 'express-validator'

const adminRouter = Router();
adminRouter.use(verifyToken)
adminRouter.use(verifyRole("admin"))

adminRouter.post('/changeAccess', validate('changeAccess'), checkParams, C_updateAccess )
adminRouter.post('/changeUserRole', validate('changeUserRole'), checkParams, C_changeUserRole )

//adminRouter.post('/access', verifyToken, C_updateAccess )

function validate(method) {

    switch (method) {
    
        case 'changeAccess': {
          return [
            body('username', "username is not given").exists(),
            body('clientID', "clientID is not given").exists(),
            body('access', "access is not given").exists(),
          ]
        }
        case 'changeUserRole' : {
            return [
            body('username', "username is not given").exists(),
            body('role', "role is not given").exists(),
            ]
        }
    }
}

export default adminRouter;

