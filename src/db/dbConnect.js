const { Pool } = require('pg')
import 'dotenv/config';

const poool = new Pool({
  connectionString: 'postgresql://plvmwubdstzdsj:07ac1a1a2e1da9c5cfb0a4e012105bcc7ef1c19ccbe7fe10aca50032795c2247@ec2-79-125-2-142.eu-west-1.compute.amazonaws.com:5432/d34vdkse2d19j4',
})

var pool = new Pool({
    user: 'plvmwubdstzdsj',
    password:'07ac1a1a2e1da9c5cfb0a4e012105bcc7ef1c19ccbe7fe10aca50032795c2247',
    database: 'd34vdkse2d19j4',
    port: 5432,
    host: 'ec2-79-125-2-142.eu-west-1.compute.amazonaws.com',
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