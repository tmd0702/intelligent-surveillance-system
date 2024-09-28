import { Topics, Producer, StoreUpdatedEvent } from '@softzone/common';

export class StoreUpdatedProducer extends Producer<StoreUpdatedEvent> {
    topic: Topics.StoreUpdated = Topics.StoreUpdated;
}
