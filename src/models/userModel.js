const db = require('../db/dbConnect')


/*
 * Select the user row in the database
 * from a given username
 */
export function findUser(username) {
  const sql = 'select * from "User" where "username"=$1'
  const params = [username];
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
export function addUser(username, firstname,lastname,password) {
    const sql = 'insert into "User" values ($1, $2, $3, $4, $5)'
    const params = [username, firstname,lastname,password, "fantassin"];
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

  export function changeUserRole(username, role) {
    const sql = 'update "User" set "role"=$1 where "username"=$2'
    const params = [role,username];
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

      