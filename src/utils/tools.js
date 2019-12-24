import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator';

export async function hashString(string){
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(string, salt);
}

export async function checkParams(req,res,next){
    const errors = validationResult(req)
    console.log("yo")
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }else{
        next();
    }
}

