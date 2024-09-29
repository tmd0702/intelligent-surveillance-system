import { Topics, Producer, OrderCreatedEvent } from '@softzone/common';

export class OrderCreatedProducer extends Producer<OrderCreatedEvent> {
    topic: Topics.OrderCreated = Topics.OrderCreated;
}
