const { Pool } = require('pg')
import 'dotenv/config';

var pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 5432,
    host: process.env.DB_HOST,
    ssl: true
}); 

pool.on('connect', () => {
    console.log('connected to the db');
  },
  () => {console.log('Not connected to the db')})

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })
module.exports = pool