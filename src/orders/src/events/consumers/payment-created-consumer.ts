import {Consumer, OrderStatus, PaymentCreatedEvent, Topics} from '@softzone/common';

const {Order} = require('../../models/order.model');

export class PaymentCreatedConsumer extends Consumer<PaymentCreatedEvent> {
    topic: Topics.PaymentCreated = Topics.PaymentCreated;

    async onMessage(data: PaymentCreatedEvent['data']) {
       const existedOrder = await Order.findByID(data.orderId);
       if (existedOrder) {
           await Order.updateByID(data.orderId, {status: OrderStatus.COMPLETE});
       } else {
           throw new Error('Order not found');
       }
    }
}
