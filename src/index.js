import 'dotenv/config';
import express from 'express';
//import mongooseConnection from './database/mongoDBConnector';

import routes from './routes';

const app = express();

// Middlewares at application level
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//mongooseConnection();

// Routes
app.use('/api', routes);


// Start the application
app.listen(process.env.PORT, () =>
    console.log(`App listening on port ${process.env.PORT}`),
);
