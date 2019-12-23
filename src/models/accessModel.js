const db = require('../db/dbConnect')


/*
 * Select the user row in the database
 * from a given username
 */
export function findAccess(username,clientId ) {
  const sql = 'select "autorized" from "Access" where "username"=$1 , "clientId=$2"'
  const params = [username, clientId];
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
export function addAccess(username, clientID) {
    const sql = 'insert into "Access" values ($1, $2)'
    const params = [username,clientID];
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

  export function updateSecretClient(username, clientId, autorized) {
    const sql = 'update "Access" set "autorized"=$1 where "username"=$1 , "clientId=$2'
    const params = [autorized,username,clientId];
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


      