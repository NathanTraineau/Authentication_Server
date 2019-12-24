import 'dotenv/config';
import { addAccess, updateAccess, findAccess } from '../../models/accessModel'

export async function C_updateAccess(req,res) {
    
    const username = req.body.username;
    const clientID = req.body.clientID;
    const accessValue = req.body.access

    const access = await findAccess(username,clientID)
    
    if(!access){
        addAccess(username,clientID,accessValue)
        .then(
            () => {
                res.status(200).send("Access added")
            },
            (err) => {
                res.status(500).send("Error with the database." + err)
            }
        )
    }
    updateAccess(username,clientID,accessValue)
    .then(
        () => {
            res.status(200).send("Access updated")
        },
        (err) => {
            res.status(500).send("Error with the database." + err)
        }
    )
}

export async function C_getAccess(req,res){
    const username = req.body.username;
    const clientID = req.body.clientID;

    const access = await findAccess(username,clientID)

    if(!access){
        res.status(200).send(false)
    }else{
        res.status(200).send(access.autorized)
    }
}