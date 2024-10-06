import {Consumer, OrderStatus, OrderCreatedEvent, Topics} from '@softzone/common';

const {Order} = require('../../models/order.model');

export class OrderCreatedConsumer extends Consumer<OrderCreatedEvent> {
    topic: Topics.OrderCreated = Topics.OrderCreated;

    async onMessage(data: OrderCreatedEvent['data']) {
        Order.create(data);
    }
}
