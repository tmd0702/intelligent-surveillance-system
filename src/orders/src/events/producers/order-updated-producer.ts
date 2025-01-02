import { Topics, Producer } from '@softzone/common';
import {OrderUpdatedEvent} from "@softzone/common/build/events/order-updated-event";

export class OrderUpdatedProducer extends Producer<OrderUpdatedEvent> {
    topic: Topics.OrderUpdated = Topics.OrderUpdated;
}
