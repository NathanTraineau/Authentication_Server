const db = require('../db/dbConnect')


/*
 * Select the access row in the database
 * from a given username and clientID
 */
export function findAccess(username,clientID) {
  const sql = 'select "autorized" from "Access" where "username"=$1 , "clientID=$2"'
  const params = [username, clientID];
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
export function addAccess(username, clientID, autorized) {
    const sql = 'insert into "Access" values ($1, $2, $3)'
    const params = [username,clientID,autorized];
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

  export function updateAccess(username, clientID, autorized) {
    const sql = 'update "Access" set "autorized"=$1 where "username"=$2 , "clientID"=$3'
    const params = [autorized,username,clientID];
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


      