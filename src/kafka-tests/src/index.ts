import {UserCreatedConsumer} from "./events/user-created-consumer";
import {UserCreatedProducer} from "./events/user-created-producer";
import {KafkaWrapper, UserStatus} from "@softzone/common";

const start = async () => {

    const kafkaWrapper = new KafkaWrapper(['localhost:9092'], 'kltn-test3');
    await kafkaWrapper.connect();
    process.on('SIGINT', () => kafkaWrapper.disconnect());
    process.on('SIGTERM', () => kafkaWrapper.disconnect());
    new UserCreatedConsumer(kafkaWrapper.consumer).consume();

    const producer = new UserCreatedProducer(kafkaWrapper.producer);
    const produceInterval = setInterval(() => {
        const data = {
            id: Math.floor(Date.now() / 1000).toString(),
            status: UserStatus.WAITING_FOR_VERIFICATION
        }
        producer.produce(data);
    }, 2000);

}

start();