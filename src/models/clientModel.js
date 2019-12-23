const db = require('../db/dbConnect')


/*
 * Select the user row in the database
 * from a given username
 */
export function findClient(clientID) {
  const sql = 'select * from "Client" where "clientID"=$1'
  const params = [clientID];
  return new Promise((resolve, reject) => {
        db.query(sql, params)
        .then((res) => {
          resolve(res.rows[0]);
        })
        .catch((err) => {
          reject(err);
        })
      })
}

/*
 * Insert the user in the database
 */
export function addClient(clientID, appName) {
    const sql = 'insert into "Client" values ($1, $2)'
    const params = [clientID, appName];
    return new Promise((resolve, reject) => {
          db.query(sql, params)
          .then((res) => {
            
  console.log("adddd"+res)
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          })
        })
  }

  export function updateSecretClient(appName, clientSecret) {
    const sql = 'update "Client" set "clientSecret"=$1 where "appName"=$2'
    const params = [clientSecret,appName];
    return new Promise((resolve, reject) => {
          db.query(sql, params)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          })
        })
  }


      