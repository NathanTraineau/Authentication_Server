import { Router } from 'express';
import 'dotenv/config';
const M_user = require('../models/userModel');
const M_Client = require('../models/clientModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const authRouter = Router();

authRouter.post('/login', async (req,res) => {
    //Check Client_ID
    //Check que le hostname de le redirection
    //Correspond bien à un des hostname autorisé.
    //Ensuite propose d'aller à l'authentification.
    //Recup les identifiants entré et guette si
    //ils sont bien dans la db.
    //Si dans la db alors envoi un code valid quelque
    //minutes que l'api va utiliser pour 
    const username = req.body.username;
    const password = req.body.password;
    const user = await M_user.findUser(username)
    if(!user){
        res.status(400).send("Username doesn't exists")
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword){
        res.status(400).send("Password doesn't matchs")
    }
    console.log(process.env.CLIENT_SECRET)
    const token = jwt.sign({username: user.username}, process.env.CLIENT_SECRET)
    res.status(200).send({token: token})
})

authRouter.post('/register', async (req,res) => {
    const username = req.body.username;
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const password = await hashString(req.body.password)
    M_user.addUser(username,firstname,lastname,password)
        .then(
            (results) => {
                console.log("reussi" + results)
                res.status(200).send("User registered.")
            },
            (err) => {
                if(err.constraint == "pk_username"){
                    res.status(400).send("Username already exists")
                }
                else{
                    res.status(400).send(err)
                }
            }
        )
    res.status(200)
})


authRouter.post('/verifyClient', async (req,res) => {
    //Check Client_ID
    //Check que le hostname de le redirection
    //Correspond bien à un des hostname autorisé.
    //Ensuite propose d'aller à l'authentification.
    //Recup les identifiants entré et guette si
    //ils sont bien dans la db.
    //Si dans la db alors envoi un code valid quelque
    //minutes que l'api va utiliser pour 
    const clientID = req.body.clientId;
    const appName = req.body.appName;
    const client = await M_user.findClient(appName)
    if(!user){
        res.status(400).send("Client doesn't exists")
    }
    const validPassword = await bcrypt.compare(clientID, client.clientID)
    if(!validPassword){
        res.status(400).send("Password doesn't matchs")
    }

    res.status(200).send("Logged in")
})

authRouter.post('/registerClient', async (req,res) => {
    if(!req.body.appName || !req.body.clientID){
        res.status(400).send("The parameters are wrong.")
    }
    const appName = req.body.appName
    const clientID = await hashString(req.body.clientID)
    M_Client.addClient(clientID,appName)
        .then(
            (results) => {
                console.log("reussi" + results)
                res.status(200).send("Client registered.")
            },
            (err) => {
                if(err.constraint == "pk_clientId"){
                    res.status(400).send("Client already exists")
                }
                if(err.constraint == "appNameUnique"){
                    res.status(400).send("App name already exists")
                }
                else{
                    res.status(400).send(err)
                }
            }
        )
    res.status(200)
})


authRouter.post('/changeAccess', async (req,res) => {
    if(!username || !clientID){
        res.status(400).send("The parameters are wrong.")
    }
    const appName = req.body.appName
    const clientID = await hashString(req.body.clientID)
    M_user.addUser(clientID,appName)
        .then(
            (results) => {
                console.log("reussi" + results)
                res.status(200).send("Client registered.")
            },
            (err) => {
                if(err.constraint == "pk_clientId"){
                    res.status(400).send("Client already exists")
                }
                if(err.constraint == "appNameUnique"){
                    res.status(400).send("App name already exists")
                }
                else{
                    res.status(400).send(err)
                }
            }
        )
    res.status(200)
})

async function hashString(string){
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(string, salt);
}

export default authRouter;