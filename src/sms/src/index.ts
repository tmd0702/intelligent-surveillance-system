import {AccountVerificationConsumer} from "./events/consumers/account-verification-consumer";
import {kafkaWrapper} from "./kafka-wrapper";

const start = async () => {
    try {
        await kafkaWrapper.connect();
        // process.on('SIGINT', () => kafkaWrapper.disconnect());
        // process.on('SIGTERM', () => kafkaWrapper.disconnect());
        new AccountVerificationConsumer().consume();
    } catch(err) {
        console.error(err);
    }
}

start();