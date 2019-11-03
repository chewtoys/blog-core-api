import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import dotenv from "dotenv";
import log from 'loglevel';
import morgan from 'morgan';
import helmet from 'helmet';

import { routes } from "./router";

// load .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

log.setLevel(log.levels.DEBUG);

// basic express headers security
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

// Log http requests
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}

app.use('/api', routes);

// Only connect to database and start server if we are not in test mode
if (process.env.NODE_ENV !== 'test') {
    // Connect to database
    createConnection({
        type: "postgres",
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        schema: process.env.DB_SCHEMA,
        synchronize: process.env.DB_SYNCHRONIZE === "false" ? false : true,
        logging: process.env.DB_LOGGING === "false" ? false : true,
        entities: [
            __dirname + '/models/**/*'
        ],
        migrations: [
            __dirname + '/migrations/**/*'
        ],
        subscribers: [
            __dirname + '/subscriber/**/*'
        ],
        cli: {
            entitiesDir: __dirname + '/models',
            migrationsDir: __dirname + '/migrations',
            subscribersDir: __dirname + '/subscriber'
        }
    }).then(() => {
        log.debug('DEBUG:', 'Connected to database');
    })
    .catch((error) => {
        log.error('Cannot connect to database', error)
    });

    app.listen(PORT, () => {
        // tslint:disable-next-line:no-console
        console.log(`> App running on port ${ PORT }`);
    });
}

export { app };
