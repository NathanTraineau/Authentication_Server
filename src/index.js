import 'dotenv/config';
import express from 'express';
//import mongooseConnection from './database/mongoDBConnector';
import swaggerUI from 'swagger-ui-express'
import routes from './routes';
import * as swaggerDocument from '../swagger.json'
const app = express();

// Middlewares at application level
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//mongooseConnection();

// Routes
app.use('/api', routes);
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// Start the application
app.listen(process.env.PORT, () =>
    console.log(`App listening on port ${process.env.PORT}`),
);
