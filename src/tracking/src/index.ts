import { app } from './app';
import {Knex} from "knex";
import {kafkaWrapper} from "./kafka-wrapper";
import {CameraStreaming04Consumer} from "./events/consumers/camera-streaming-04-consumer";
import {CameraStreaming03Consumer} from "./events/consumers/camera-streaming-03-consumer";
import {CameraStreaming02Consumer} from "./events/consumers/camera-streaming-02-consumer";
import {CameraStreaming01Consumer} from "./events/consumers/camera-streaming-01-consumer";
import {CameraStreamingB4Consumer} from "./events/consumers/camera-streaming-b4-consumer";
import {CameraStreamingB3Consumer} from "./events/consumers/camera-streaming-b3-consumer";
import {CameraStreamingB2Consumer} from "./events/consumers/camera-streaming-b2-consumer";
import {CameraStreamingB1Consumer} from "./events/consumers/camera-streaming-b1-consumer";
import {CameraStreamingGConsumer} from "./events/consumers/camera-streaming-g-consumer";
import {CameraCreatedConsumer} from "./events/consumers/camera-created-consumer";
import {CameraUpdatedConsumer} from "./events/consumers/camera-updated-consumer";
import {LocationCreatedConsumer} from "./events/consumers/location-created-consumer";
import {LocationUpdatedConsumer} from "./events/consumers/location-updated-consumer";
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
        new CameraStreaming04Consumer().consume();
        new CameraStreaming03Consumer().consume();
        new CameraStreaming02Consumer().consume();
        new CameraStreaming01Consumer().consume();
        new CameraStreamingGConsumer().consume();
        new CameraStreamingB1Consumer().consume();
        new CameraStreamingB2Consumer().consume();
        new CameraStreamingB3Consumer().consume();
        new CameraStreamingB4Consumer().consume();
        new CameraUpdatedConsumer().consume();
        new CameraCreatedConsumer().consume();
        new LocationUpdatedConsumer().consume();
        new LocationCreatedConsumer().consume();
        new UserCreatedConsumer().consume();
        new UserUpdatedConsumer().consume();
    } catch (err) {
        console.error(err);
    }
    app.listen(config.get('SERVER_PORT'), () => {
        console.log(`Listening on port ${config.get('SERVER_PORT')}`);
    });
};

start();

