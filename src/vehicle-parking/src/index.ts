import { app } from './app';
import {Knex} from "knex";
import {kafkaWrapper} from "./kafka-wrapper";
import {UserCreatedConsumer} from "./events/consumers/user-created-consumer";
import {UserUpdatedConsumer} from "./events/consumers/user-updated-consumer";
const config = require('config');
export const db: Knex = require('knex')({
    client: 'pg',
    connection: {
        host : config.get("DATABASE.POSTGRESQL.HOST"),
        port : config.get("DATABASE.POSTGRESQL.PORT"),
        user : config.get("DATABASE.POSTGRESQL.USER"),
        password : config.get("DATABASE.POSTGRESQL.PASSWORD"),
        database : config.get("DATABASE.POSTGRESQL.DATABASE")
    }
});

const start = async (): Promise<void> => {
    try {
        await kafkaWrapper.connect();
        // process.on('SIGINT', () => kafkaWrapper.disconnect());
        // process.on('SIGTERM', () => kafkaWrapper.disconnect());
        new UserCreatedConsumer(kafkaWrapper.consumer).consume();
        new UserUpdatedConsumer(kafkaWrapper.consumer).consume();
    } catch (err) {
        console.error(err);
    }
    app.listen(config.get('SERVER_PORT'), () => {
        console.log(`Listening on port ${config.get('SERVER_PORT')}`);
    });
};

start();

