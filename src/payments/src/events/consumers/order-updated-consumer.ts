import {Consumer, OrderStatus, OrderCreatedEvent, Topics} from '@softzone/common';
import {OrderUpdatedEvent} from "@softzone/common/build/events/order-updated-event";

const {Order} = require('../../models/order.model');

export class OrderUpdatedConsumer extends Consumer<OrderUpdatedEvent> {
    topic: Topics.OrderUpdated = Topics.OrderUpdated;

    async onMessage(data: OrderCreatedEvent['data']) {
        console.log('receive order update', data)
        Order.updateByID(data.id, data);
    }
}
