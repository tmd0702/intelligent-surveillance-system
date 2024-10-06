import { app } from './app';
import {Knex} from "knex";
import {kafkaWrapper} from "./kafka-wrapper";
import {ItemCreatedConsumer} from "./events/consumers/item-created-consumer";
import {ItemUpdatedConsumer} from "./events/consumers/item-updated-consumer";
import {StoreCreatedConsumer} from "./events/consumers/store-created-consumer";
import {StoreUpdatedConsumer} from "./events/consumers/store-updated-consumer";
import {PaymentCreatedConsumer} from "./events/consumers/payment-created-consumer";
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
        new StoreCreatedConsumer().consume();
        new StoreUpdatedConsumer().consume();
        new ItemCreatedConsumer().consume();
        new ItemUpdatedConsumer().consume();
        new PaymentCreatedConsumer().consume();
    } catch (err) {
        console.error(err);
    }
    app.listen(config.get('SERVER_PORT'), () => {
        console.log(`Listening on port ${config.get('SERVER_PORT')}`);
    });
};

start();

