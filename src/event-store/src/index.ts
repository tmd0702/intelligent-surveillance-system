import { app } from './app';
// import {kafkaWrapper} from "./kafka-wrapper";

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
import {CameraUpdatedConsumer} from "./events/consumers/camera-updated-consumer";
import {CameraCreatedConsumer} from "./events/consumers/camera-created-consumer";
import {DepartmentCreatedConsumer} from "./events/consumers/department-created-consumer";
import {DepartmentUpdatedConsumer} from "./events/consumers/department-updated-consumer";
import {EmployeeCreatedConsumer} from "./events/consumers/employee-created-consumer";
import {EmployeeUpdatedConsumer} from "./events/consumers/employee-updated-consumer";
import {LocationCreatedConsumer} from "./events/consumers/location-created-consumer";
import {LocationUpdatedConsumer} from "./events/consumers/location-updated-consumer";

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
        // process.on('SIGINT', () => kafkaWrapper.disconnect());
        // process.on('SIGTERM', () => kafkaWrapper.disconnect());
        new AccountVerificationConsumer().consume();
        new ItemCreatedConsumer().consume();
        new ItemUpdatedConsumer().consume();
        new OrderCreatedConsumer().consume();
        new PaymentCreatedConsumer().consume();
        new StoreUpdatedConsumer().consume();
        new StoreCreatedConsumer().consume();
        new UserCreatedConsumer().consume();
        new UserUpdatedConsumer().consume();
        new VerificationCompleteConsumer().consume();

        new CameraUpdatedConsumer().consume();
        new CameraCreatedConsumer().consume();
        new DepartmentCreatedConsumer().consume();
        new DepartmentUpdatedConsumer().consume();
        new EmployeeCreatedConsumer().consume();
        new EmployeeUpdatedConsumer().consume();
        new LocationCreatedConsumer().consume();
        new LocationUpdatedConsumer().consume();
    } catch (err) {
        console.error(err);
    }
    app.listen(config.get('SERVER_PORT'), () => {
        console.log(`Listening on port ${config.get('SERVER_PORT')}`);
    });
};

start();

