import { Topics, Producer, StoreCreatedEvent } from '@softzone/common';

export class StoreCreatedProducer extends Producer<StoreCreatedEvent> {
    topic: Topics.StoreCreated = Topics.StoreCreated;
}
