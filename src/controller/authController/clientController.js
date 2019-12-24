import 'dotenv/config';
import {addClient} from '../../models/clientModel'

export async function C_registerClient(req,res) {
    
    const appName = req.body.appName
    const clientID = req.body.clientID
    addClient(clientID,appName)
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
}