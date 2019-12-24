import 'dotenv/config';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { addUser, findUser, changeUserRole } from '../../models/userModel'
import { hashString } from '../../utils/tools'
import { validationResult } from 'express-validator';

export async function C_login(req,res) {
    
    const username = req.body.username;
    const password = req.body.password;
    const user = await findUser(username)
    
    if(!user){
        res.status(400).send({ errors : { msg : "Username doesn't exists"}})
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword){
        res.status(400).send({ errors : { msg : "Password doesn't matchs"}})
    }
    // We remove the password from the payload
    delete user['password']
    // We build the tokens
    const token = jwt.sign(user, process.env.ACCESS_SECRET, { expiresIn: 3600 })
    const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET, { expiresIn: Number.MAX_SAFE_INTEGER})

    const response = {
        "account": user,
        "token": token,
        "refreshToken": refreshToken,
    }
    res.status(200).send(response)
}

export async function C_register(req,res) {
    const username = req.body.username;
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const password = await hashString(req.body.password)
    addUser(username,firstname,lastname,password)
        .then(
            () => {
                res.status(200).send({ errors : { msg : "User registered."}})
            },
            (err) => {
                if(err.constraint == "pk_username"){
                    res.status(400).send({ errors : { msg : "Username already exists"}})
                }
                else{
                    res.status(400).send(err)
                }
            }
        )
}

export async function C_refreshToken(req,res){
    const user = req.user
    delete user['password']
    console.log(user)
    const token = jwt.sign(user, process.env.ACCESS_SECRET)
    response = {token : token}
    res.status(200).send(response)
}

export async function C_changeUserRole(req,res){
    const username = req.body.username
    const role = req.body.role

    changeUserRole(username,role)
    .then(
        () => {
            res.status(200).send("User role changed to " + role)
        },
        (err) => {
            res.status(400).send(err)
        }
    )
}