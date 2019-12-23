import {verifyToken} from '../utils/authMiddleware'
import { Router } from 'express';

const adminRouter = Router();

adminRouter.post('/upgrade', verifyToken, (req,res) => {
    res.send("protected dataa seen by " + JSON.stringify(req.user))
})

export default adminRouter;

