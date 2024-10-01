import { app } from './app';
import {kafkaWrapper} from "./kafka-wrapper";

import {AccountVerificationConsumer} from "./events/consumers/account-verification-consumer";
import {ItemCreatedConsumer} from "./events/consumers/item-created-consumer";
import {ItemUpdatedConsumer} from "./events/consumers/item-updated-consumer";
import {OrderCreatedConsumer} from "./events/consumers/order-created-consumer";
import {PaymentCreatedConsumer} from "./events/consumers/payment-created-consumer";
import {StoreCreatedConsumer} from "./events/consumers/store-created-consumer";
import {StoreUpdatedConsumer} from "./events/consumers/store-updated-consumer";
import {UserCreatedConsumer} from "./events/consumers/user-created-consumer";
import {UserUpdatedConsumer} from "./events/consumers/user-updated-consumer";
import {VerificationCompleteConsumer} from "./events/consumers/verification-complete-consumer";
import mongoose from "mongoose";
const config = require('config');

mongoose
    .connect(config.get("DATABASE.MONGOOSE.URI"))
    .then(() => {
        console.log("DB Connection Successfully");
    })
    .catch((err) => {
        console.log(err.message);
    });

const start = async (): Promise<void> => {
    try {
        await kafkaWrapper.connect();
        // process.on('SIGINT', () => kafkaWrapper.disconnect());
        // process.on('SIGTERM', () => kafkaWrapper.disconnect());
        new AccountVerificationConsumer(kafkaWrapper.consumer).consume();
        new ItemCreatedConsumer(kafkaWrapper.consumer).consume();
        new ItemUpdatedConsumer(kafkaWrapper.consumer).consume();
        new OrderCreatedConsumer(kafkaWrapper.consumer).consume();
        new PaymentCreatedConsumer(kafkaWrapper.consumer).consume();
        new StoreUpdatedConsumer(kafkaWrapper.consumer).consume();
        new StoreCreatedConsumer(kafkaWrapper.consumer).consume();
        new UserCreatedConsumer(kafkaWrapper.consumer).consume();
        new UserUpdatedConsumer(kafkaWrapper.consumer).consume();
        new VerificationCompleteConsumer(kafkaWrapper.consumer).consume();
    } catch (err) {
        console.error(err);
    }
    app.listen(config.get('SERVER_PORT'), () => {
        console.log(`Listening on port ${config.get('SERVER_PORT')}`);
    });
};

start();

