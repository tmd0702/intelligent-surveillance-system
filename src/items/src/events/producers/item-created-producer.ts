import { Topics, Producer, ItemCreatedEvent } from '@softzone/common';

export class ItemCreatedProducer extends Producer<ItemCreatedEvent> {
    topic: Topics.ItemCreated = Topics.ItemCreated;
}
