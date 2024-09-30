import {Consumer, OrderStatus, PaymentCreatedEvent, Topics} from '@softzone/common';

const {Order} = require('../../models/order.model');

export class OrderCreatedConsumer extends Consumer<PaymentCreatedEvent> {
    topic: Topics.PaymentCreated = Topics.PaymentCreated;

    async onMessage(data: PaymentCreatedEvent['data']) {
        Order.create(data);
    }
}
