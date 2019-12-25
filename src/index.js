import 'dotenv/config';
import express from 'express';

import routes from './routes';
const app = express();

if(process.env.ENVIRONNEMENT !== 'PRODUCTION'){
    const swaggerUI = require('swagger-ui-express')
    const swaggerDocument = require('../swagger.json')
    app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
}

// Middlewares at application level
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);
//

// Start the application
app.listen(process.env.PORT, () =>
    console.log(`App listening on port ${process.env.PORT}`),
);
