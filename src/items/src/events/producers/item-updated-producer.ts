import {Topics, Producer, ItemUpdatedEvent} from '@softzone/common';

export class ItemUpdatedProducer extends Producer<ItemUpdatedEvent> {
    topic: Topics.ItemUpdated = Topics.ItemUpdated;
}
