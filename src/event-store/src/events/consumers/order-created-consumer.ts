import {Consumer, OrderStatus, PaymentCreatedEvent, Topics} from '@softzone/common';
import EventModel from "../../models/event.model";

export class OrderCreatedConsumer extends Consumer<PaymentCreatedEvent> {
    topic: Topics.PaymentCreated = Topics.PaymentCreated;

    async onMessage(data: PaymentCreatedEvent['data']) {
        const newEvent = {
            eventType: this.topic,
            payload: data,
        };
        await EventModel.create(newEvent);
    }
}
